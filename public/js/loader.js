// public/js/loader.js
function updateLoaderProgress(progress) {
    const progressBar = document.querySelector('.progress');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }
  
  function updateLoadingDetails(details) {
    const loadingDetails = document.querySelector('.loading-details');
    if (loadingDetails) {
      loadingDetails.innerHTML = details
        .map((detail) => `<p>${detail}</p>`)
        .join('');
    }
  }
  
  // Exportar funciones para usarlas en otros archivos
  window.Loader = {
    updateLoaderProgress,
    updateLoadingDetails,
  };