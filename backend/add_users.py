
# import sqlite3

# DB_PATH = "database.db"

# users = [
#     ("kavyakota18", "bkt@kota", "admin"),
#     ("admin", "admin123", "admin"),
#     ("staff1", "staffpass", "staff")

# ]

# with sqlite3.connect(DB_PATH) as conn:
#     for username, password, role in users:
#         try:
#             conn.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", (username, password, role))
#         except sqlite3.IntegrityError:
#             print(f"User {username} already exists")
