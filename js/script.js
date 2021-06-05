async function sendRequest(url, method) {
    return new Promise((resolve, reject) => {

        let xmlhr = new XMLHttpRequest();
        xmlhr.open(method, url);

        xmlhr.responseType = 'json';

        xmlhr.onload = () => {
            resolve(xmlhr.response);            

            let users = xmlhr.response;
            
            let user = document.getElementById('user');
            let userValue = Object.values(users[0]);
            user.textContent = userValue;          
        };
        
        xmlhr.send();     
    });    
}


async function sendRequest2(url, method) {
    return new Promise((resolve, reject) => {

        let xmlhr2 = new XMLHttpRequest();
        xmlhr2.open(method, url);

        xmlhr2.responseType = 'json';

        xmlhr2.onload = () => {
            resolve(xmlhr2.response);            

            let users = xmlhr2.response;

            let usersCompanies = users.sort(function(a, b){
                let nameA = a.company.name.toLowerCase(), 
                nameB = b.company.name.toLowerCase();
                  if (nameA < nameB) 
                    return -1;
                  if (nameA > nameB)
                    return 1;
                  return 0; 
               });
            
            let companies = users.map(function(obj) {
                return obj.company.name; 
            });

            companies = companies.filter(function(v,i) { 
                return companies.indexOf(v) === i; 
            });

            let textField = document.getElementById('companies');
            textField.innerHTML = companies.sort();
               
            console.log('a) Filter by company name (A to Z):', usersCompanies);
          

            let usersNames = users.filter((userLetter) => {
                return userLetter.name[0] === 'C';
            });
            console.log('b) Users whose name begins with the letter C:', usersNames);


            let usersCities = users.filter((userCityName) => {
                return userCityName.address.city[0] === 'R';
            });
            console.log('c) Users who live in cities with name begins with the letter P:', usersCities);            
        };
        
        xmlhr2.send();        
    });    
}


async function sendRequest3(url, method) {
    return new Promise((resolve, reject) => {

        let xmlhr3 = new XMLHttpRequest();
        xmlhr3.open(method, url);

        xmlhr3.responseType = 'json';

        xmlhr3.onload = () => {
            resolve(xmlhr3.response);

            let users = xmlhr3.response;
            return users;    
        };
        
        xmlhr3.send();    
    });    
}


async function abc() {
    let url = 'http://jsonplaceholder.typicode.com/users';
    let users = await sendRequest(url, 'GET');
    console.log('ALL USERS:', users);
    let users2 = await sendRequest2(url, 'GET');
    console.log('ALL USERS AGAIN:', users2);
    let url2 = 'https://jsonplaceholder.typicode.com/users/5/posts';
    let users3 = await sendRequest3(url2, 'GET');
    console.log('d) Show user posts in the console:', users3);
}


abc();