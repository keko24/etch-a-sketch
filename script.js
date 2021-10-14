function removeGrid()
{
	container.style.cssText = '';
	while (container.firstElementChild)
		container.removeChild(container.firstElementChild);
}

function createGrid(n)
{
	container.style.cssText = `grid-template-rows: repeat(${n}, 1fr [row-start]); grid-template-columns: repeat(${n}, 1fr [column-start])`;
	for (let i = 0; i < n; i++)
	{
		for (let j = 0; j < n; j++)
		{
			const div = document.createElement('div');
			div.classList.add('square');
			container.appendChild(div);
		}
	}
}

function newGrid()
{
	let n;
	do {
		n = window.prompt('Enter number of squares per side for the new grid (max 100): ');
		if (!n) return;
	} while (n > 100 || n < 1);
	removeGrid();
	createGrid(n);
	const squares = container.querySelectorAll('.square');
	squares.forEach(square => square.addEventListener('mouseover', changeColor, {once: true}));
	squares.forEach(square => square.addEventListener('mouseover', lowerBrightness));
}

function rgbToHsl(r, g, b)
{
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0;
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
	if (h < 0) h += 360;
    }
    return [h, s, l];
}

function changeColor(e)
{
	this.style.backgroundColor = `hsl(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100)}%, 50%)`;
}

function lowerBrightness(e)
{
	let rgb = this.style.backgroundColor;
	rgb = rgb.substring(4, rgb.length-1).replace(/ /g, '').split(',');
	for (let i = 0; i < 3; i++)
		rgb[i] = +rgb[i];
	let hsl =  rgbToHsl(rgb[0], rgb[1], rgb[2]);
	this.style.backgroundColor = `hsl(${Math.floor(hsl[0])}, ${Math.floor(hsl[1] * 100)}%, ${Math.floor(hsl[2] * 100) - 5}%)`;
}

const container = document.querySelector('div');
createGrid(16);
const squares = container.querySelectorAll('.square');
squares.forEach(square => square.addEventListener('mouseover', changeColor, {once: true}));
squares.forEach(square => square.addEventListener('mouseover', lowerBrightness));
const button = document.querySelector('button');
button.addEventListener('click', newGrid);
