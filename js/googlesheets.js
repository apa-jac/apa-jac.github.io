function readGoogleSheet(tabName, callback) {
  var spreadsheetID = "1hnWcTqDrJ0c4ONUD8476XGdQrNeI1FGBu0cTWKHLLH8";
  var apiKey = "AIzaSyAsSKLcTCFgVfIrgYD4bJAG-evsZQ-wRF8";
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${tabName}?alt=json&key=${apiKey}`;

  $.getJSON(url, function (data) {
    data.values.shift();  // Remove header
    data.values = data.values.filter(row =>
      row[row.length - 1].toLowerCase() === 'sim' // Only use rows habilitadas
    );
    data.values = data.values.reverse(); // Display latest rows first
    callback(data.values);
  });
}

function getPictureUrl(url) {
  if (url.includes("pasteboard.co")) {
    return `https://gcdnb.pbrd.co/images/${url.split('/').pop()}`;
  } else {
    return url;
  }
}

function alunosCarousel() {
  // Testimonials carousel
  $(".alunos-carousel").owlCarousel({
    center: true,
    autoplay: true,
    smartSpeed: 2000,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
}

function addAlunos(alunos) {
  alunos.forEach((aluno, index) => {
    const alunoHTML = `
      <div class="testimonial-item px-3">
        <div class="bg-light shadow-sm rounded mb-4 p-4">
          <h3 class="fas fa-quote-left text-primary mr-3"></h3>
          ${aluno[2]}
        </div>
        <div class="d-flex align-items-center">
          <img class="rounded-circle" src="${getPictureUrl(aluno[3])}"
            style="width: 70px; height: 70px;" alt="Image">
          <div class="pl-3">
            <h5>${aluno[0]}</h5>
            <i>${aluno[1]}</i>
          </div>
        </div>
      </div>
    `;

    $('.alunos').append(alunoHTML);
  });

  if (alunos.length > 0) {
    alunosCarousel();
  } else {
    $('.alunos-container').hide();
  }
}

function addCampanha(campanhas) {
  if (campanhas.length > 0) {
    var campanha = campanhas[campanhas.length - 1];
    const campanhaHTML = `
    <div class="card border-0 bg-light shadow-sm pb-2">
      <a href="${getPictureUrl(campanha[2])}" target="_blank">
        <img class="card-img-top mb-2" src="${getPictureUrl(campanha[2])}" alt>
      </a>
      <div class="card-body text-center">
        <h4 class="card-title">${campanha[0]}</h4>
        <p class="card-text">${campanha[1]}</p>
      </div>
    </div>
  `;

    $('.campanha').append(campanhaHTML);
  }
}

function addEventos(eventos) {
  eventos.forEach((evento, index) => {
    const eventoHTML = `
        <div class="col-lg-4 mb-5">
        <div class="card border-0 bg-light shadow-sm pb-2">
          <a href="${getPictureUrl(evento[7])}" target="_blank">
            <img class="card-img-top mb-2" src="${getPictureUrl(evento[7])}" alt>
          </a>
          <div class="card-body text-center">
            <h4 class="card-title">${evento[0]}</h4>
            <p class="card-text">${evento[1]}</p>
          </div>
          <div class="card-footer bg-transparent py-4 px-5">
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right">
                <strong>Data</strong>
              </div>
              <div class="col-6 py-1">${evento[2]}</div>
            </div>
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right">
                <strong>Horário</strong>
              </div>
              <div class="col-6 py-1">${evento[3]}</div>
            </div>
            <div class="row border-bottom">
              <div class="col-6 py-1 text-right border-right">
                <strong>Local</strong>
              </div>
              <div class="col-6 py-1">${evento[4]}</div>
            </div>
            <div class="row">
              <div class="col-6 py-1 text-right border-right">
                <strong>Custo</strong>
              </div>
              <div class="col-6 py-1">${evento[5]}</div>
            </div>
          </div>
          <a href="${evento[6]}" target="_blank" class="btn btn-primary px-4 mx-auto mb-4">Participar</a>
        </div>
      </div>
    `;

    $('.eventos').append(eventoHTML);
  });

  if (eventos.length === 0) {
    $('.eventos-container').hide();
  }
}

function addVoluntarios(voluntarios) {
  voluntarios.forEach((voluntario, index) => {
    const voluntarioHTML = `
      <div class="col-md-6 col-lg-3 text-center team mb-5">
        <div class="position-relative overflow-hidden mb-4"
          style="border-radius: 100%;">
          <img class="img-fluid w-100 h-100 ratio" src="${getPictureUrl(voluntario[2])}" alt>
          <div
            class="team-social d-flex align-items-center justify-content-center w-100 h-100 position-absolute">
            <a class="btn btn-outline-light text-center mr-2 px-0"
              style="width: 38px; height: 38px;"
              href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a class="btn btn-outline-light text-center mr-2 px-0"
              style="width: 38px; height: 38px;"
              href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a class="btn btn-outline-light text-center px-0"
              style="width: 38px; height: 38px;"
              href="#">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <h4>${voluntario[0]}</h4>
        <i>${voluntario[1]}</i>
      </div>
    </div>
    `;

    $('.voluntarios').append(voluntarioHTML);
  });

  if (voluntarios.length === 0) {
    $('.voluntarios-container').hide();
  }
}

$(document).ready(function () {
  readGoogleSheet('voluntarios', addVoluntarios);
  readGoogleSheet('eventos', addEventos);
  readGoogleSheet('alunos', addAlunos);
  readGoogleSheet('campanhas', addCampanha);
});
