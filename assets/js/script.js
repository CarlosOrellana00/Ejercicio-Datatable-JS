let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  // scrollX: "2000px",
  lengthMenu: [5,10,15,20,25,100,200],
  columnDefs: [
    { className: "centered", targets:[0,1,2,3,4,5,6] },
    { orderable: false, targets: [5,6] },
    // { width: "50%", targets:[0]},
    { searchable: false, targets:[1]}
  ],
  pageLength: 3, //cantidad de registros visibles por vista
  destroy: true,
  language: {
      lengthMenu: "Mostrar _MENU_ registros por página",
      zeroRecords: "Ningún usuario encontrado",
      info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
      infoEmpty: "Ningún usuario encontrado",
      infoFiltered: "(filtrados desde _MAX_ registros totales)",
      search: "Buscar:",
      loadingRecords: "Cargando...",
      paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
      }
  }
};

const initDataTable = async () =>{
  if(dataTableIsInitialized){
    dataTable.destroy();
  }
  await listUsers();

  dataTable = $("#datatable_users").DataTable(dataTableOptions);

  dataTableIsInitialized = true;
}

const listUsers = async () => {
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    // console.log(data);
    let content = ``;
    users.forEach((user, index) => {
      //Para tener mas de 10 registros
      // for(let x=0; x<5;x++)
      // content +=`
      // <tr>
      //   <td>${index + 1}</td>
      //   <td>${user.name}</td>
      //   <td>${user.email}</td>
      //   <td>${user.address.city}</td>
      //   <td>${user.company.name}</td>
      //   <td><i class="fa-solid fa-check" style="color: green;"></i></td>
      //   <td>
      //     <button type="button" class="btn btn-primary"><i class="fa-solid fa-jet-fighter"></i></i></button>
      //     <button type="button" class="btn btn-dark"><i class="fa-solid fa-ship"></i></button>
      //     <button type="button" class="btn btn-info"><i class="fa-solid fa-car-burst"></i></button>
      //   </td>
      // </tr>`;
      //FIN DE REGISTROS REPETIDOS

      // TENER LOS 10 REGISTROS ORIGINALES
      content +=`
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.address.city}</td>
        <td>${user.company.name}</td>
        <td><i class="fa-solid fa-check" style="color: green;"></i></td>
        <td>
          <button type="button" class="btn btn-primary"><i class="fa-solid fa-jet-fighter"></i></i></button>
          <button type="button" class="btn btn-dark"><i class="fa-solid fa-ship"></i></button>
          <button type="button" class="btn btn-info"><i class="fa-solid fa-car-burst"></i></button>
        </td>
      </tr>`;
      //FIN DE LOS 10 REGISTROS ORIGINALES
    });
    tableBody_users.innerHTML = content;
  }catch(ex){
    alert(ex);
  }
};

window.addEventListener("load", async () => {
  // await listUsers();
  await initDataTable();
});