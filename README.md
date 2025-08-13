### Where's My Money
is an attempt to teach myself React and .Net Core. It is a simple budgeting app. 
I really had no direction I was heading in, so ideas and functionality are all over the place and this is in no way completed. If you actually want to run this thing, you will need to add a .net user secret to the API project with the format of
```
{
  "DbPassword": "password",
  "DbUserName": "sa"
}
```
I am running a azuresqledge docker container for the SQL database as I am on a Mac, so you will need one of those too or a local SQL server. Configure your ```appsettings.json``` with the proper connection info. I have left everything as default, so there shouldn't need a lot of or any configuration there. 

NuGet packages
Automapper 13: app & tests

coverlet.collector 6: tests

MediatR: 12.4.1: app

Microsoft.AspNetCore.Identity.EntityFrameworkCore 8.0.12: data access

 Microsoft.AspNetCore.Mvc.Testing 8: tests

 Microsoft.AspNetCore.OpenApi 8.0.7: api

 Microsoft.EntityFrameworkCore.Design 8.0.12: api

 Microsoft.EntityFrameworkCore.InMemory 8: tests

 Microsoft.EntityFrameworkCore.SqlServer 8.0.12: tests

 Microsoft.EntityFrameworkCore.Tools 8.0.12: data access

 Microsoft.NET.Test.Sdk 17.8.0: tests

 Moq: 4.20.70: tests

 Swashbuckle.AspNetCore 6.5: api

 xunit 2.5.3: tests

 xunit.runner.visualstudio 2.5.3: tests

 Some screenshots
 

<img width="2558" height="1440" alt="Screenshot 2025-08-12 at 10 18 38 PM" src="https://github.com/user-attachments/assets/3ec677ed-b564-4351-8645-be629a7a0d29" />
<img width="2557" height="1440" alt="Screenshot 2025-08-12 at 10 18 48 PM" src="https://github.com/user-attachments/assets/971baa19-2745-4b37-bb1c-dd89f12c267f" />
<img width="2559" height="1440" alt="Screenshot 2025-08-12 at 10 20 11 PM" src="https://github.com/user-attachments/assets/fe7fefea-22ea-40a8-9656-0c405438e49d" />
<img width="2559" height="1440" alt="Screenshot 2025-08-12 at 10 20 24 PM" src="https://github.com/user-attachments/assets/d2f29621-339b-4b3c-8bbb-b984a9704b7b" />
<img width="2557" height="1440" alt="Screenshot 2025-08-12 at 10 21 11 PM" src="https://github.com/user-attachments/assets/d975db3c-2f24-4dfd-bf68-3afcebd5e621" />
<img width="1281" height="720" alt="Screenshot 2025-08-12 at 10 21 37 PM" src="https://github.com/user-attachments/assets/686b7103-7dea-4b25-b4ad-ebc11861768e" />
