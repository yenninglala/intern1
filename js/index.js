  //DOM
  let data = [];
  var selectzone = document.getElementById('selectzone');
  var spottitle = document.getElementById('spottitle');
  var allthings = document.getElementById('allthings');
  var buttonList = document.getElementById('btnspot');
  var spottotal = document.getElementById('spottotal');
  var page = document.getElementById('page');
  var current_page = 1;
  var records_per_page = 6;

  // EventListerner
  btnselect.addEventListener('click', buttonchangetitle, false);
  //
  var xhr = new XMLHttpRequest();
  var requestURL = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
  // true : 非同步 不會等資料傳回來 就會讓程式繼續往下跑 等到回傳資料才會自動回傳
  //false : 同步 會等資料傳回來 才讓程式繼續往下跑
  xhr.open('get', requestURL, true);
  xhr.send();
  xhr.onload = function () {
    data = JSON.parse(xhr.responseText).result.records;
    dataselect();
    changespottitle();
  }
  //下拉式選單
  function dataselect() {
    let zonename = new Set(); // 沒有重複就往前執行
    let zoneList = data.filter(item => !zonename.has(item.Zone) ? zonename.add(item.Zone) : false);
    for (let i = 0; i < zoneList.length; i++) {
      var option = document.createElement("option");
      option.textContent = zoneList[i].Zone;
      //設置指定元素上的某個屬性值。如果屬性已經存在，
      //則更新該值；否則，使用指定的名稱和值添加一個新的屬性。
      option.setAttribute = ('value', zoneList[i].Zone);
      selectzone.add(option);

    }
  }
  // 選單選地區
  function changespottitle() {
    var str = '';
    var allthing = '';
    var countss = 0;
    for (let i = 0; i < data.length; i++) {
      if (selectzone.value == data[i].Zone) {
        countss++;

        str = selectzone.value;
        spottitle.innerHTML = str;
        allthing +=
          '<br>' +
          '<div class="card text-align" style="width: 20rem;">' +
          '<img class="card-img-top" src =' + data[i].Picture1 + '>' +
          '<div class="card-body">' +
          '<h5 class="card-title">' + data[i].Name + '</h5>' +
          '<p class="card-text">' + data[i].Description + '</p>' +
          '</div>' +
          '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item">' + data[i].Zone + '</li>' +
          '<li class="list-group-item">' + data[i].Opentime +
          '</li>' +
          '<li class="list-group-item">' + data[i].Add + '</li>' +
          ' </ul>' + '</div>' + '<br>';
        allthings.innerHTML = allthing;
        spottotal.innerHTML = countss;

        function showBtn() {
          var page = document.getElementById('pageDiv');
          var btnNum = Math.ceil(countss / 6);
          console.log(btnNum)
          var str = '';
          for (var j = 0; j < btnNum; j++) {
            str += `<button class="btn btn-secondary">${j+1}</button>`
          }
          page.innerHTML = str;
        }
        showBtn();

      } else if (selectzone.value == "全區域景點") {
        spottitle.innerHTML = "全區域景點";
        data.forEach((item) => {
          allthing += `<br>
              <div class="card text-align" style="width: 20rem;">
                  <img class="card-img-top" height="155px" src="${item.Picture1}">
                  <div class="card-body">
                  <h5 class="card-title">${item.Name}</h5>
                  <p class="card-text">${item.Description}</p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${item.Zone}</li>
                  <li class="list-group-item">${item.Opentime}</li>
                  <li class="list-group-item">${item.Add}</li>
                </ul>
              </div>
              <br>`;
        });
        allthings.innerHTML = allthing;
        spottotal.innerHTML = data.length;
        function showBtn() {
          var page = document.getElementById('pageDiv');
          var btnNum = Math.ceil(data.length/ 6);
          console.log(btnNum)
          var str = '';
          for (var j = 0; j < btnNum; j++) {
            str += `<button class="btn btn-secondary" onclick="connetBtn">${j+1}</button>`
          }
          page.innerHTML = str;
        }
        showBtn();
      }

    }
  }
  // 按鈕選地區
  function buttonchangetitle(e) {
    var select = e.target.value;
    var countss = 0;
    spottitle.textContent = select;
    var allthing = '';
    for (var i = 0; i < data.length; i++) {
      if (select == data[i].Zone) {
        countss++;
        allthing +=
          '<br>' +
          '<div class="card text-align" style="width: 20rem;">' +
          '<img class="card-img-top" src =' + data[i].Picture1 + '>' +
          '<div class="card-body">' +
          '<h5 class="card-title">' + data[i].Name + '</h5>' +
          '<p class="card-text">' + data[i].Description + '</p>' +
          '</div>' +
          '<ul class="list-group list-group-flush">' +
          '<li class="list-group-item">' + data[i].Zone + '</li>' +
          '<li class="list-group-item">' + data[i].Opentime +
          '</li>' +
          '<li class="list-group-item">' + data[i].Add + '</li>' +
          ' </ul>' + '</div>' + '<br>';
        allthings.innerHTML = allthing;
        spottotal.innerHTML = countss;
        function showBtn() {
          var page = document.getElementById('pageDiv');
          var btnNum = Math.ceil(countss / 6);
          console.log(btnNum)
          var str = '';
          for (var j = 0; j < btnNum; j++) {
            str += `<button class="btn btn-secondary" id="connectbtn">${j+1}</button>`
          }
          page.innerHTML = str;
        }
        showBtn();
      }
    }
  }
  //分頁連結內容
  function connetBtn()
  {
      var connectbtn = document.getElementById('connectbtn');
  }

