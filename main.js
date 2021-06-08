let categories = [];

let rootElement = document.getElementsByClassName("recommendation_widget_root")[0];

fetch('http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=4&source.type=video&source.id=214321562187&source.url=http://www.site.com/videos/214321562187.html')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Error: Status Code: ' + response.status);
                return;
            }

            response.json().then(function (data) {

                for (let i = 0; i < data.list.length; i++) {

                    //Getting the current type
                    let type = data.list[i].origin;

                    //Checking if the current type exists
                    let flag = false;
                    for (let j = 0; j <= categories.length && !flag; j++) {
                        if (type === categories[j]) {
                            flag = true;
                        }
                    }

                    if (!flag) {
                        //Creating header for new type if doesn't exist
                        categories.push(type);
                        let header_div = document.createElement("div");
                        header_div.setAttribute("id", type);
                        header_div.setAttribute("class", "header");
                        let header = document.createElement("h1");
                        header.innerHTML = type;
                        header_div.appendChild(header)
                        rootElement.appendChild(header_div)
                        let flex_container = document.createElement("div");
                        flex_container.setAttribute("class", "flex-container");
                        flex_container.setAttribute("id", "flex-container-" + type);
                        rootElement.insertBefore(flex_container, null);

                    }

                    //Creating new div dynamically
                    let flex_item = document.createElement("div");
                    flex_item.setAttribute("class", "flex-item flex-item-" + type);
                    let flex_container_type = document.getElementById("flex-container-" + type);


                    //Adding images
                    add_Image(flex_item, data.list[i].thumbnail[0].url, flex_container_type);
                    add_Name(flex_item, data.list[i].name, flex_container_type);

                    switch (type) {
                        case "sponsored":
                            add_Branding(flex_item, data.list[i].branding, flex_container_type);
                            flex_item.addEventListener('click', function () {
                                window.open(data.list[i].url);
                            }, false);
                            break;
                        case "organic":
                            /*....*/
                            break;
                    }
                }
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :', err);
    });


//Function for adding image to flex-item
function add_Image(flex_item, value, container) {
    let img = document.createElement("img");
    img.setAttribute("src", value);
    img.setAttribute("alt", "Error: image cannot be displayed");
    flex_item.appendChild(img);
    container.appendChild(flex_item);
}

//Function for adding image to flex-item
function add_Name(flex_item, value, container) {
    var p = document.createElement("p");
    p.innerHTML = value;
    flex_item.appendChild(p);
    container.appendChild(flex_item);
}

//Function for adding branding value to flex-item
function add_Branding(flex_item, value, container) {
    var p = document.createElement("p");
    p.innerHTML = value;
    p.setAttribute("class", "branding")
    flex_item.appendChild(p);
    container.appendChild(flex_item);
}

