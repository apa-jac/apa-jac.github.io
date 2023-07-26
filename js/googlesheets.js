function readGoogleSheet(tabName, callback) {
  var spreadsheetID = "1hnWcTqDrJ0c4ONUD8476XGdQrNeI1FGBu0cTWKHLLH8";
  var apiKey = "AIzaSyAsSKLcTCFgVfIrgYD4bJAG-evsZQ-wRF8";
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${tabName}?alt=json&key=${apiKey}`;

  $.getJSON(url, function (data) {
    data.values.shift();  // Remove header
    callback(data.values);
  });
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
          <img class="rounded-circle" src="img/apajac/2012_2.jpg"
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

  alunosCarousel();
}

function addEventos(eventos) {
  eventos.forEach((evento, index) => {
    const eventoHTML = `
        <div class="col-lg-4 mb-5">
        <div class="card border-0 bg-light shadow-sm pb-2">
          <img class="card-img-top mb-2" src="img/imageKid.png" alt>
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
          <a href class="btn btn-primary px-4 mx-auto mb-4">Participar</a>
        </div>
      </div>
    `;

    $('.eventos').append(eventoHTML);
  });
}

function addVoluntarios(voluntarios) {
  voluntarios.forEach((voluntario, index) => {
    const voluntarioHTML = `
      <div class="col-md-6 col-lg-3 text-center team mb-5">
        <div class="position-relative overflow-hidden mb-4"
          style="border-radius: 100%;">
          <img class="img-fluid w-100" src="img/apajac/2012_2.jpg" alt>
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
}

$(document).ready(function () {
  readGoogleSheet('voluntarios', addVoluntarios);
  readGoogleSheet('eventos', addEventos);
  readGoogleSheet('alunos', addAlunos);
});
