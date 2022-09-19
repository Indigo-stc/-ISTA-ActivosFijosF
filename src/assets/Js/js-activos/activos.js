
// codigo java de la Image
'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
      // let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
      // if (validExtensions.includes(fileType)) {
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
      // } else {
      //   alert("This is not an Image File!");}
      });
	});


	
}( document, window, 0 ));

// progress bar

'use strict';

;( function ( document, window, index )
{
    //pasar datos de un form a otrp
    function obtenerdatos(){
      var codigoA=document.getElementById('CodigoActivo').value;
      var nombreA=document.getElementById('NombreActivo').value;

      document.getElementById('codQR').value = codigoA;
      document.getElementById('nomQR').value = nombreA;
    }
    //fin



  //Inicio de codigo qr
  const contenedorQR = document.getElementById('contenedorQR');
  const formulario = document.getElementById('formulario');
  const QR = new QRCode(contenedorQR);
  
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    QR.makeCode(formulario.nomQR.value + formulario.codQR.value);
  });

  //guardar qr
// function guardarImagen(){
  //   const qrElemen =document.querySelector('#contenedorQR canvas');
  //   const dlink = document.getElementById('bdescargar');
  //   var imagen = qrElemen.toDataURL("image/png").replace("image/png","image/octet-stream");
  //   dlink.addEventListener('click', (e) => {
  //   dlink.setAttribute('href',imagen);
  //   dlink.setAttribute('download', 'codigoA.png');
  //   // dlink.click();
   
  // });
//fin de codigo qr





const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".step-forms");
const progressSteps = document.querySelectorAll(".progress-step");


let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
    obtenerdatos();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
    
  });
});


function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("step-forms-active") &&
      formStep.classList.remove("step-forms-active");
       }
       );

  formSteps[formStepsNum].classList.add("step-forms-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
      
    } else {
      progressStep.classList.remove("progress-step-active");
   
    }
  });

  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum) {
      
      progressStep.classList.add("progress-step-check");
    } else {
   
      progressStep.classList.remove("progress-step-check");
    }
  });
 
  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}


document.getElementById("submit-form").addEventListener("click", function () {

    progressSteps.forEach((progressStep, idx) => {
    if (idx <= formStepsNum) {
      
      progressStep.classList.add("progress-step-check");
    } else {
   
      progressStep.classList.remove("progress-step-check");
    }
  });
  
   var forms = document.getElementById("forms");
   forms.classList.remove("form");
   forms.innerHTML = '<div class="welcome"><div class="content"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h2>Thanks for signup!</h2><span>We will contact you soon!</span><div></div>';
});
}( document, window, 0 ));

