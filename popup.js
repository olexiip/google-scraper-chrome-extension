function InjectChecker() {
  chrome.tabs.query({active: true}, function(tabs) {
    tabs.forEach((tab)=>{
      try {
        if (tab.url) {
          let currentUrl = (new URL(tab.url));
          if (currentUrl.protocol !== "chrome:") {
            chrome.scripting.executeScript(
              {
                  target:{tabId: tab.id, allFrames: false},
                  func:checkPage
              },
              onChecked
          )
          }
        } else {
  
        }
      } catch {
  
      }
    })
  })
}

function checkPage() {

  let gres = document.querySelectorAll("div:not([id])>div.g>div>div>div a[ping][data-ved]");
  let gimg = document.querySelectorAll("#islrg>div>div>a:nth-child(3)");
  let gvideo = document.querySelectorAll("#search a[data-ved][jsname]");
  let yres = document.querySelectorAll("ul>li>div>div>a:has(h2)");

  let x;
  if (gres.length>0) {
    x= gres;
  } else if (gimg.length>0) {
    x= gimg;
  } else if (gvideo.length>0) {
    x= gvideo;
  } else if (yres.length>0) {
    x= yres;
  } else {
    x= [];
  }

  let res = "";
  let resn = "";
  let counter = 0+0;
  x.forEach((el) => {
  if (el.href.length>1 && el.offsetWidth>0) {
    counter++;
    resn = resn + counter + "\t" + el.href + "\n";
    res = res + el.href + "\n";
  };
  });

  return {
    list:res,
    listn:resn,
  };
} 

let res;
function onChecked(results) {
  if (results) {
    res = results[0].result;
    if (res) {
      document.querySelector("#list").innerHTML = res.list;
    }
  }

}

const grabBtn = document.getElementById("copy");
grabBtn.addEventListener("click",() => {    
  navigator.clipboard.writeText(res.listn);
})

InjectChecker();