# Pending -

1. User & employee 2 ta phase ke alada rakha hobe. onk ta erkm user hisebe dekha gelo admin, password evabe db te save hobe.  
2. jodi user logged in hoy tkhn header navigation block rakhte hobe na hole intially hidden rakhte hobe.

# What i learned from this project?

1. jodi amra database e sql management system use kori & orm hisebe sequelize use kori tobe models folder e index.js namok file create kore tar modhye sequelize configuration korte hobe.
2. puro database system ta ke ekta db object er madhyome use korbo. karon sadharon obstai amra jkhn model use kore data query, save etc kaj korbo tokhon kaj korbe na. karon sequelize sob somoy prefer kore model instance base.
3. amra table to table relationship er kaj korbo database/model index/config file theke.
4. ekta table field er data onyo ekti table er filed/record theke asbe tokhon alada kore fieldname assign korar proyojon nai. example - amdr ei project e ekjon employee kono ekta department e thakbe tahole employee & department associated. to ekhetre association er niyom onujayi departmentId bose jabe reference akare. ebong data retrieve kora somoy associated model theke data paoyar niyom follow korley hobe fole department er name ta peye jabo.
5. jodi date, time niye kaj kora hoy database e & only date/ only time ta save rakhte hobe tahole get() method use kore moment() module er help nite pari. [sequelize er jonyo projojoyo]  