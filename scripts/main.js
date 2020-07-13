//Game Controller
function gameCtlr() {
	let gameArr = ["x","x","o","o","x","o","x","o","o"];
	//creates Player
	const playerFactory = (name) => {
		return { name };
	}

	//renders to DOM
	function render() {

			gameArr.forEach((element,index) => {
				let gameBrd = document.querySelector('.board');
				let wrapper = document.createElement('p');
				wrapper.classList.add('marker');
				wrapper.textContent = gameArr[index];
				gameBrd.appendChild(wrapper);
		})
	}
	render();	
};


// IIFE to run Game Controller onload
(function () {
	window.addEventListener('load', (event) => {
		gameCtlr();
	})
})();




