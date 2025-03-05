from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
import os
import pandas as pd

Base = declarative_base()

class ATC(Base):
    __tablename__ = 'ATC'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    parent_id = Column(Integer, ForeignKey('ATC.id'), nullable=True)
    code = Column(String, unique=True, nullable=False)

# Подключение к MySQL (используйте переменные окружения для безопасности)
DB_HOST = os.getenv('DB_HOST', '89.108.111.57')
DB_NAME = os.getenv('DB_NAME', 'farm_direct')
DB_USER = os.getenv('DB_USER', 'aleksey')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Lunatik3')

db_url = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}'
engine = create_engine(db_url)
Session = sessionmaker(bind=engine)
session = Session()

# Читаем данные из Excel
excel_file = "medicine.xlsx"
df = pd.read_excel(excel_file, header=None, names=["code", "name"])

data = df.values.tolist()

# Загружаем данные в базу
atc_dict = {row.code: row for row in session.query(ATC).all()}  # Загружаем существующие данные
for code, name in data:
    parent_code = code[:-1] if len(code) > 1 else None  # Определяем возможный parent
    parent = atc_dict.get(parent_code)
    entry = ATC(code=code, name=name, parent_id=parent.id if parent else None)
    session.add(entry)
    session.flush()  # Получаем ID сразу
    atc_dict[code] = entry

session.commit()
print("Данные из Excel успешно загружены!")
