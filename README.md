# Express Middleware Assignment

## 📌 Project Overview
This project demonstrates the use of **Express.js middleware** for authentication, traffic control, and security.  
It includes:
- Bearer Token authentication for API access  
- Basic Auth for dashboard access  
- Session management with logout  
- Rate limiting and IP filtering middleware  

---

## ⚙️ Run Instructions
```bash
npm install
npm start

Authentication
- Bearer Token (API)
- Header: Authorization: Bearer my_secret_token
- Basic Auth (Dashboard)
- Username: admin
- Password: password123

Endpoints
- / → Homepage with instructions
- /api/oil-prices → JSON data (requires Bearer Token)
- /dashboard → HTML dashboard (requires Basic Auth)
- /logout → Ends session

Security Features
- Rate Limiting → Max 10 requests/minute per client
- IP Filtering → Only allows requests from localhost (127.0.0.1 or ::1)

Testing
- Use Postman or browser to test endpoints.
- Confirm:
- /api/oil-prices returns JSON with correct token.
- /dashboard prompts for Basic Auth.
- /logout shows “Logged Out.”
- Rate limiting blocks after 10 requests/minute.
- Non-localhost IPs get 403 Forbidden.
