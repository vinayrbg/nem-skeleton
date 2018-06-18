const request = require('request');
const requestPromise = require('request-promise');

exports.hubbleData = function (data, callback) {
    var url = "https://www.miraclesoft.com/HubbleServices/hubbleresources/mconEmployeeServices/getMconEmployeeSuggestionList";
    console.log("data", data);
    var json = JSON.stringify({
        "SearchKey": data,
        "Authorization": "YWRtaW46YWRtaW4="
    })
    require('request').post({
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        body: json,
    }, function (err, res, body) {
        //console.log("res", res.body.employees)
        callback(JSON.parse(body));
    });
}

exports.fetchEmployeeHubbleData = function (data) {
    var url = "https://www.miraclesoft.com/HubbleServices/hubbleresources/mconEmployeeServices/getMconEmployeeSuggestionList";
    // console.log("data", data);
    var json = JSON.stringify({
        "SearchKey": data,
        "Authorization": "YWRtaW46YWRtaW4="
    })

    return requestPromise({
        method: 'POST',
        uri: url,
        headers: {
            'content-type': 'application/json'
        },
        body: json,
    });
}


exports.resolveEmployeeLocation = function (employees) {
    return new Promise((fullfill, reject) => {
        // var i = 0;
        // while (i < 2) {
        //     exports.fetchEmployeeHubbleData(employees[i].emp_name).then((hubbleData)=>{
        //         hubbleData = JSON.parse(hubbleData);
        //         employees[i].location = hubbleData.employees[0].Location;
        //         i++;
        //     })
        //     if(i==1){
        //         fullfill(employees);
        //         break;
        //     }
        //     console.log("i",i);
        // }
        newEmp = employees.map((employee) => {
            exports.fetchEmployeeHubbleData(employee.emp_name).then((hubbleData) => {
                hubbleData = JSON.parse(hubbleData);
                employee.location = hubbleData.employees[0].Location;
                //console.log("Employee", employee);
                
                return employee
            })
        })
        //fullfill(newEmp);
        //console.log("Employees: ", employees);
    })
}
