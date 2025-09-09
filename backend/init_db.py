
# import sqlite3

# conn = sqlite3.connect('database.db')
# cursor = conn.cursor()

# # Table to store feedback
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS feedback (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     emotion TEXT NOT NULL,
#     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
# )
# ''')

# # Optional: Admin login table
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS admin (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     username TEXT NOT NULL UNIQUE,
#     password TEXT NOT NULL
# )
# ''')

# conn.commit()
# conn.close()

import sqlite3

conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Table to store feedback
cursor.execute('''
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emotion TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Unified table for admin and staff login
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
''')

# Insert default users (admin and staff1)
users = [
    ("kavyakota18", "bkt@kota", "admin"),
    ('admin', 'admin123', 'admin'),
    ('staff1', 'staff123', 'staff')
]

for username, password, role in users:
    try:
        cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, password, role))
        print(f"Inserted user: {username}")
    except sqlite3.IntegrityError:
        print(f"User {username} already exists")

conn.commit()
conn.close()
