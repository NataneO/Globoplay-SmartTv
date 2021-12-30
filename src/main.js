let domCanvas = document.getElementById('c');
let domContext = domCanvas?.getContext('2d');
let halfWidth = document.documentElement.clientWidth / 2
let halfHeight = document.documentElement.clientHeight / 2
let myWidth = document.documentElement.clientWidth;
let myHeight = document.documentElement.clientHeight;

domContext.canvas.width = myWidth;
domContext.canvas.height = myHeight;
let title = "";
let focus = 1
let showDetails = false;



window.addEventListener('keydown', KeyDown, true);
window.addEventListener('resize', resizeCanvas, false);



let redraw = "0"
initData(redraw);

function initData(redraw) {

  fetch('https://run.mocky.io/v3/a4afe906-e1fe-4613-861e-5657c1eece67')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let img = new Image();
      img.src = data.images.cover;
      img.onload = function () {
        switch (redraw) {
          case "1":
            primaryItens(img, data, redraw)
            detailsBody(showDetails, redraw)
            detailsContent(data, redraw)
            break;

          case "2":
            primaryItens(img, data, redraw)
            boxContent(focus);
            break;

          case "3":
            primaryItens(img, data, redraw)
            secondaryItems(data);
            listMessage(data);
            break;

          case "4":
            primaryItens(img, data, redraw)
            secondaryItems(data)
          break;

          case "0":
            primaryItens(img, data, redraw)
            secondaryItems(data)
            break;

        }
        console.log(redraw)
      };
      return "ok"
    })

}

function primaryItens(img, data, redraw) {
  if (redraw == "0" || redraw=="2" || redraw=="4") {
    domContext.drawImage(img, 80, 0, myWidth, myHeight);
  } else {

  }

  gradient = domContext.createLinearGradient(myWidth, myHeight, 0, 100);
  for (t = 1; t >= 0; t -= 0.02) {
    gradient.addColorStop(t, "hsla(360, 100%, 0%, " + easeInOut(t) * 1 + ")");
  }
  if (redraw == "0" || redraw=="2" || redraw=="4") {
    domContext.fillStyle = gradient;
    spacingLeft = 80
  } else {
    domContext.fillStyle = "rgba(0, 0, 0, 0.9)";
    spacingLeft = 0
  }


  domContext.fillRect(spacingLeft, 0, myWidth, myHeight);

  drawTitle(data.title);

}

function secondaryItems(data) {
  drawDescription(data.description)
  drawClassification(data.classification, redraw);
  dataBody(data.category, data.genres, data.year)
  detailsBody(showDetails, redraw);
  detailsContent(data, redraw)
  drawButtons(redraw, focus);
}

function KeyDown(evt) {
  let before = 0
  switch (evt.keyCode) {
    case 38:

      break;
    case 40:
      redraw = "1";
      showDetails = true;
      before = focus
      focus = 1
      domContext.clearRect(0, 0, domContext.canvas.width, domContext.canvas.height)
      initData(redraw)

      break;
    case 37:

      focus = focus - 1
      if (focus < 0) {
        focus = 0;
      }

      drawButtons(redraw, focus)

      break;
    case 39:
      if (redraw == "1") {
        showDetails = false;
        redraw = "0";
        detailsBody(showDetails, redraw)
      } else {
        focus = focus + 1;
        if (focus > 4) {
          focus = 4;
        }
      }

      drawButtons(redraw, focus)
      break;

    case 13:
      switch (focus) {
        case 0:
          console.log(focus + "Voltar")

          break;
        case 1:
          drawBox();
          break;

        case 2:
          drawAddList()
          break;

        case 3:
          drawBox();
          break;

        case 4:
          redraw = "4"
          initData(redraw)
          break;

      }

  }

}
function resizeCanvas() {
  domContext.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
  initData(redraw)
}

function easeInOut(t) { return t < .5 ? 4 * t * t * t : (t - 1.1) * (2.2 * t - 2) * (2 * t - 2) + 1 }

function drawTitle(title) {
  domContext.font = "2em Open Sans,sans-serif"
  domContext.fillStyle = 'white';
  title = title
  domContext.fillText(title, domContext.canvas.width / 15, domContext.canvas.height / 10);
}

function drawDescription(description) {
  let spacingLeft = 0
  let spacingTop = 0
  if (redraw == "1") {
    maxWidth = domContext.canvas.width / 3
    spacingLeft = domContext.canvas.width / 2
    spacingTop = 300

  } else {
    alertExclusiveContent()
    maxWidth = domContext.canvas.width / 2
    spacingLeft = domContext.canvas.width / 15
    spacingTop = domContext.canvas.height / 3.2
  }



  domContext.font = "1em Open Sans,sans-serif"



  lineHeight = 25;

  wrapText(domContext, description, spacingLeft, spacingTop, maxWidth, lineHeight);
}
function alertExclusiveContent() {
  domContext.font = "20px FontAwesome"
  domContext.fillText('\uF023', domContext.canvas.width / 15, domContext.canvas.height / 1.6)
  domContext.font = ".8em Open Sans,sans-serif"
  domContext.fillStyle = 'white';
  domContext.fillText('Conteudo exclusivo para assinantes Globoplay', domContext.canvas.width / 12, domContext.canvas.height / 1.6);
}

function wrapText(domContext, description, x, y, maxWidth, lineHeight) {
  words = description.split(' ');
  line = '';

  for (n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    metrics = domContext.measureText(testLine);
    testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      domContext.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  domContext.fillText(line, x, y);
}

function drawClassification(classification, redraw) {
  let ageRating = new Map();
  ageRating.set('L', 'assets/img/L.png');
  ageRating.set('10', 'assets/img/10.png');
  ageRating.set('12', 'assets/img/12.png');
  ageRating.set('14', 'assets/img/14.png');
  ageRating.set('16', 'assets/img/16.png');
  ageRating.set('18', 'assets/img/18.png');
  let ageRatingIcon = new Image();
  ageRatingIcon.src = ageRating.get(classification);

  if (redraw == "0") {
    spacingTop = domContext.canvas.height / 8
    spacingLeft = domContext.canvas.width / 15
  } else {
    spacingTop = domContext.canvas.height / 3.55
    spacingLeft = domContext.canvas.width / 11.5
  }
  ageRatingIcon.onload = function () {
    domContext.drawImage(ageRatingIcon, spacingLeft, spacingTop, 20, 20);

  }
}



function dataBody(category, genres, year) {
  domContext.font = "1em Open Sans,sans-serif"
  domContext.fillStyle = 'white';
  title = title
  domContext.fillText((category + "  " + genres[0] + "  " + year), domContext.canvas.width / 11, domContext.canvas.height / 6.8);

}

function detailsBody(showDetails, redraw) {
  marginTop = 0;
  detailsHeight = 0
  if (showDetails == false) {
    if (redraw == "1") {
      domContext.clearRect(0, 0, domContext.canvas.width, domContext.canvas.height)
    }

    initData(redraw);
    marginTop = halfHeight + 200;
    detailsHeight = 200;
  } else {
    marginTop = 100
    detailsHeight = 500
  }
  domContext.font = "1em Open Sans, sans-serif"
  domContext.fillStyle = 'white';
  domContext.fillText("Detalhes", domContext.canvas.width / 15, marginTop)
  height = document.documentElement.clientHeight
  width = document.documentElement.clientWidth

  domContext.fillStyle = "#222";

  larg = 200000
  top = 90
  domContext.fillRect(domContext.canvas.width / 15, marginTop + 30, width - ((width / 15) * 2), detailsHeight)
  domContext.fillStyle = "#fff";


}

function detailsContent(data, redraw) {
  if (redraw == "0") {
    domContext.fillStyle = '#333'
  } else {
    domContext.fillStyle = '#fff'
  }
  domContext.fillText("Titulo original: " + data.title, domContext.canvas.width / 10, marginTop + 80)
  domContext.fillText("Nao ha inadequacoes ", domContext.canvas.width / 9, marginTop + 110)
  drawClassification(data.classification, redraw)
  domContext.fillText("Genero: " + data.genres[1], domContext.canvas.width / 2, marginTop + 80)
  domContext.fillText("Pais: ", domContext.canvas.width / 2, marginTop + 110)
  domContext.fillText("Ano de lancamento: " + data.year, domContext.canvas.width / 2, marginTop + 140)
  domContext.fillText("Sinopse: ", domContext.canvas.width / 2, marginTop + 170)
  drawDescription(data.description)

}


function drawButtons(redraw, focus) {
  btnValue = new Map();
  
  if (redraw == "1") {
    btnValue.set('Voltar', '\uF060');
    focus = 0;
  } else {
    let iconVariation = (redraw=="4"?'\uF004':'\uF184');
    btnValue.set('Voltar', '\uF060');
    btnValue.set('Assista', '\uF04b');
    btnValue.set('Minha lista', '\uF055');
    btnValue.set('Capitulos', '\uF26c');
    btnValue.set('Curtir', iconVariation);
    marginRight = domContext.canvas.width / 15
    domContext.clearRect(domContext.canvas.height / 30, domContext.canvas.height / 2.4, (120 * btnValue.length), 100)
    domContext.clearRect(marginRight, domContext.canvas.height / 2.4, 345, 100)
  }

  domContext.strokeStyle = "white";

  i = 0
  active = 0

  for ([key, value] of btnValue) {
    domContext.fillStyle = "white"
    if (key == "Voltar") {
      active = 0
      drawIcons(active, marginRight, key, value)

      if (i == focus) {
        marginRight = marginRight
        active = 1
        drawIcons(active, marginRight, key, value)
      }
    } else {
      if (i == focus) {

        btnItem = domContext.fillRect(marginRight, domContext.canvas.height / 2.4, 100, 100);
        active = 1
      } else {
        btnItem = domContext.strokeRect(marginRight, domContext.canvas.height / 2.4, 100, 100);
        active = 0
      }
      drawIcons(active, marginRight, key, value)

      marginRight = marginRight + 120;
    }

    i++;
  }

}

function drawIcons(active, marginRight, name, icon) {


  domContext.font = '30px FontAwesome';
  if (name == "Voltar") {

    (active == 1 ? domContext.fillStyle = "white" : domContext.fillStyle = "#333")
    domContext.fillText(icon, domContext.canvas.width / 30, domContext.canvas.height / 10);
  } else {
    (active == 1 ? domContext.fillStyle = "black" : domContext.fillStyle = "white")
    domContext.fillText(icon, marginRight + 35, domContext.canvas.height / 2.05);
    domContext.font = '.8em Open Sans, sans-serif'
    domContext.fillText(name, (marginRight + ((100 - domContext.measureText(name).width) / 2)), domContext.canvas.height / 1.9);
  }

  domContext.measureText(name).width

}

function drawBox() {
  console.log(redraw)
  domContext.clearRect(0, 0, domContext.canvas.width, domContext.canvas.height)
  redraw = "2";
  initData(redraw)
}

function boxContent(focus) {
  let content = "";
  if (focus == "1") {
    content = "Esse espaco fica reservado para o player"
  } else if (focus == "3") {
    content = "Esse espaco fica reservado para a listagem de capítulos"
  }

  domContext.fillStyle = "#333";
  domContext.fillRect(domContext.canvas.width / 15, domContext.canvas.height / 8, domContext.canvas.width - ((domContext.canvas.width / 15) * 2), domContext.canvas.height - ((domContext.canvas.height / 8) * 2))
  domContext.fillStyle = "#fff";
  domContext.fillText(content, (marginRight + ((100 - domContext.measureText(content).width) / 2)), domContext.canvas.height / 1.9)
}


function drawAddList() {
  console.log(redraw)
  domContext.clearRect(0, 0, domContext.canvas.width, domContext.canvas.height)
  redraw = "3";
  initData(redraw)
}

function listMessage(data) {
  domContext.fillStyle = "#333";
  domContext.fillRect(domContext.canvas.width / 15, domContext.canvas.height / 8, domContext.canvas.width - ((domContext.canvas.width / 15) * 2), domContext.canvas.height - ((domContext.canvas.height / 8) * 7))
  domContext.fillStyle = "#fff";
  let content = "A " + (data.category).toLowerCase() + " '" + data.title + "' foi adicionada a sua lista :)"
  domContext.fillText(content, (marginRight + ((100 - domContext.measureText(content).width) / 2)), domContext.canvas.height - ((domContext.canvas.height / 8) * 6.5))
}

