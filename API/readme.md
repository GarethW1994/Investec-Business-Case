
```sql
CREATE DATABASE investec_data;
CREATE USER investec_user@localhost IDENTIFIED BY 'Investec3!';
GRANT ALL PRIVILEGES ON investec_data.* TO investec_user@localhost;
FLUSH PRIVILEGES;
```
