import os
import requests
from bs4 import BeautifulSoup
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()


class ATC(Base):
    __tablename__ = 'ATC'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    parent_id = Column(Integer, ForeignKey('ATC.id'), nullable=True)
    code = Column(String, unique=True, nullable=False)


# Подключение к базе данных
DB_HOST = os.getenv('DB_HOST', '89.108.111.57')
DB_NAME = os.getenv('DB_NAME', 'farm_direct')
DB_USER = os.getenv('DB_USER', 'aleksey')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Lunatik3')

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()


def parse_vidal(url):
    response = requests.get(url)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    # Ищем тег <h1> для извлечения названия и кода
    h1_tag = soup.find('h1', class_='h1')
    if h1_tag:
        # Извлекаем название и код из текста <h1>
        name = h1_tag.text.strip().split('(')[0].strip()  # Название
        code = h1_tag.text.strip().split(
            '(')[1].replace(')', '').strip()  # Код (например, C)

        # Добавляем строку в начало данных
        data = [[code, name]]
    else:
        data = []

    # Находим все строки таблицы
    rows = soup.find_all('tr')

    # Добавляем данные из таблицы
    for row in rows:
        td_elements = row.find_all('td')
        if len(td_elements) >= 2:
            style = td_elements[0].get("style", "")
            if "padding-left:52px" in style:
                continue

            code = td_elements[0].text.strip()
            name = td_elements[1].text.strip()
            data.append([code, name])

    data.pop(1)  # Удаляем 2-ю строку
    data.pop(1)  # Удаляем 3-ю строку

    return data


def save_to_database(data):
    existing_codes = {
        entry.code: entry.id for entry in session.query(ATC).all()}

    for code, name in data:
        parent_id = None

        # Пробуем найти родителя с помощью среза (первоначальный срез)
        parent_code = code[:-1] if len(code) > 1 else None

        # Проверяем, есть ли родитель с таким кодом
        if parent_code and parent_code in existing_codes:
            parent_id = existing_codes[parent_code]

        # Если родитель не найден с помощью среза, ищем его старым способом (по префиксу)
        if not parent_id:
            for existing_code in existing_codes:
                if code.startswith(existing_code) and len(existing_code) < len(code):
                    parent_id = existing_codes[existing_code]
                    break

        # Если родитель найден или нет
        if code not in existing_codes:
            new_entry = ATC(code=code, name=name, parent_id=parent_id)
            session.add(new_entry)
            session.commit()
            print(f'Добавлена категория {name}')
            existing_codes[code] = new_entry.id

    print("Данные загружены в базу данных")


def save_to_excel(data, filename='output.xlsx'):
    # Преобразуем данные в DataFrame
    df = pd.DataFrame(data, columns=["Code", "Name"])

    # Сохраняем в Excel
    df.to_excel(filename, index=False, engine='openpyxl')
    print(f"Данные сохранены в {filename}")


if __name__ == "__main__":
    urls = [
        "https://www.vidal.ru/drugs/atcl/d", "https://www.vidal.ru/drugs/atcl/g"
        # Добавьте сюда другие URL
    ]

    all_data = []
    for url in urls:
        all_data.extend(parse_vidal(url))

    # Сначала сохраняем в базу данных
    save_to_database(all_data)

    # Также сохраняем в Excel
    # save_to_excel(all_data, 'atc_data.xlsx')
