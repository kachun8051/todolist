# todolist - Web API written in Node.js and deploy to Alibaba Cloud Function Compute


## Brief of API
Service name: myservice
Function name: todolist


A list is used to store string. The list can be listed, added, removed, dumped data and remove all by various end point. 
1. list - show all content in list
2. add - add a string to the list
3. remove - remove a string found in the list regardless of upper case nor lower case.
4. addall - dump a list to the list without duplication
5. removeall - clear the list


## How to call the API by using postman?
1. Show all content in the list **GET /list**

![GET /list](./postman_image/list.png) 

2. Add a string to the list **POST /add** 

![POST /add](./postman_image/add.png)

3. Remove a string found in the list regardless of upper case nor lower case. **PUT /remove** 

    For example, if the list contains "apple", "APPLE" can be found and removed.  

![PUT /remove](./postman_image/remove.png)

4. Dump a list to the list without duplication **POST /addall** 

![POST /addall](./postman_image/addall.png)

5. Clear the list **POST /removeall** 

![POST /removeall](./postman_image/removeall.png)

## How to execute this API in your computer by Visual Studio Code?

1. Select aliyun in left navigation tab

![](./postman_image/VSC_ALIYUN.png)

2. Find function name "todolist". Click the arrow

![](./postman_image/VSC_FUNCTIONCOMPUTE_localrun.png)

3. Find the link in terminal and copy it to the postman

![](./postman_image/VSC_link.png)
