console.log('holaaa');

var formulario = document.getElementById('contact');

switch (document.title) {
  case "Consult Pacients":
    console.log("we're on Consult")
    consultP();
    break;

  case "Add Pacients":
    console.log("we're on Add")
    addP();
    break;

  case "Update Pacients":
    updateP();
    console.log("we're on Update")
    break;

  case "Delete Pacients":
    deleteP();
    console.log("we're on Delete")
    break;
} 

function consultP() {
let table = document.getElementById('tableP');
formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('consulting...');
  var myHeaders = new Headers();

  const options = {
    method: 'GET',
    headers: myHeaders,
  }

  fetch('/basedatos/consultatotalpacientes', options)
    .then((res) => res.json())
    .then((pacientes) => {
      console.log("fetching...")
      let dataP = pacientes;
      console.log(dataP);
      let table2return=`
      <table>
        <tr>
          <th>Name</th>
          <th>Lastname</th>
          <th>ID</th>
        </tr>`;
      for (let index = 0; index < dataP.length; index++){
        table2return += `<tr>
          <td>${dataP[index].nombre}</td>
          <td>${dataP[index].apellido}</td>
          <td>${dataP[index].numid}</td>
        </tr>`;
      };
      table2return += `</table>`;
      table.innerHTML = table2return;
      table.style.display = "block"
    });
});
}

function addP() {
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Adding...');
    let datos = new FormData(formulario);
    let nombrepaciente = datos.get('nombre');
    let apellidopaciente = datos.get('apellido');
    let idpaciente = datos.get('identificacion');
  
    let myHeaders = new Headers();
  
    const options = {
      method: 'PUT',
      headers: myHeaders,
      body: new URLSearchParams({
        'nombre': nombrepaciente,
        'apellido': apellidopaciente,
        'numid': idpaciente
      }),
    }
  
    fetch('/basedatos/insertarpaciente', options)
      .then((res) => res.json())
      .then((pacientes) => {
        console.log(pacientes);
      });
  });
}

function updateP() {
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Updating...');
    let datos = new FormData(formulario);
    let nombrepaciente = datos.get('nombre');
    let apellidopaciente = datos.get('apellido');
    let idpaciente = datos.get('identificacion');
  
    let myHeaders = new Headers();
  
    const options = {
      method: 'POST',
      headers: myHeaders,
      body: new URLSearchParams({
        'nombre': nombrepaciente,
        'apellido': apellidopaciente,
        'numid': idpaciente
      }),
    }
  
    fetch('/basedatos/actualizadototalpacientes', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}

function deleteP() {
  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Deleting from existence...');
    let datos = new FormData(formulario);
    let nombrepaciente = datos.get('nombre');
    let apellidopaciente = datos.get('apellido');
    let idpaciente = datos.get('identificacion');
  
    let myHeaders = new Headers();
  
    const options = {
      method: 'DELETE',
      headers: myHeaders,
      body: new URLSearchParams({
        'numid': idpaciente
      }),
    }
  
    fetch('/basedatos/borradototalpacientes', options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
}


