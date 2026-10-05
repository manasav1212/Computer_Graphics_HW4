let cylinderPositions = new Float32Array();
let cylinderColors = new Float32Array();
let cylinderIndices = new Uint16Array();

let torusPositions = new Float32Array();
let torusColors = new Float32Array();
let torusIndices = new Uint16Array();

let spherePositions = new Float32Array();
let sphereColors = new Float32Array();
let sphereIndices = new Uint16Array();

let conePositions = new Float32Array();
let coneColors = new Float32Array();
let coneIndices = new Uint16Array();

function drawSphere(radius)
{
  const Positions = [], Indices = [], Colors = [];
  let vsteps = 25;
  let usteps = 25;

  for(let i=0; i<=vsteps; i++)
  {
    const v = i* Math.PI / vsteps;
    const sinv = Math.sin(v);
    const cosv = Math.cos(v);

    for(let j=0; j<=usteps; j++)
    {
      const u = j * 2 * Math.PI / usteps;
      const sinu = Math.sin(u);
      const cosu = Math.cos(u);

      let x = radius * sinv * cosu;
      let y = radius * sinv * sinu;
      let z = radius * cosv;

      Positions.push(x, y, z);
      Colors.push(Math.abs(Math.sin(j)), Math.abs(Math.sin(i)), Math.abs(Math.sin(i+j)));
    }
  }

  for(let i=0; i<vsteps; i++)
  {
    for(let j=0; j<usteps; j++)
    {
      let first = (i * (usteps + 1)) + j;
      let second = first + usteps + 1;
      Indices.push(first, second, first+1);
      Indices.push(second, second+1, first+1);
    }
  }

  spherePositions = new Float32Array(Positions);
  sphereColors = new Float32Array(Colors);
  sphereIndices = new Uint16Array(Indices);

}

function drawCylinder(radius, height)
{
  const Positions = [], Indices = [], Colors = [];
  const vsteps = 25;
  const usteps = 25;
  for(let i=0; i<= vsteps; i++)
  {
    let v = i / vsteps;
    for(let j=0; j<=usteps; j++)
    {
      let u = j * 2 * Math.PI / usteps;
      let sinu = Math.sin(u);
      let cosu = Math.cos(u);
      let x = radius * cosu;
      let y = radius * sinu;
      let z = v * height;
      Positions.push(x, y, z);
      Colors.push(0.25 +Math.abs(Math.sin(i)), 0.25 +Math.abs(Math.sin(j)), 0.25 +Math.abs(Math.sin(i+j)));
    }
  }

  for(let i=0; i<vsteps; i++)
  {
    for(let j=0; j<usteps; j++)
    {
      let first = i * (usteps + 1) + j;
      let second = first + (usteps + 1);
      Indices.push(first, second, first+1);
      Indices.push(first+1, second, second+1);
    }
  }

  let bottomCenter = Positions.length / 3;
  Positions.push(0, 0, 0);
   Colors.push(Math.random(), Math.random(), Math.random());

  let topCenter = Positions.length / 3;
  Positions.push(0, 0, height);
  Colors.push(Math.random(), Math.random(), Math.random());

  for(let j=0; j<usteps; j++)
  {
    let first = j;
    let second = first+1;
    Indices.push(bottomCenter, second, first);
  }

  let topStart = vsteps * (usteps+1);
  for(let j=0; j<usteps; j++)
  {
    let first = j + topStart;
    let second = first + 1;
    Indices.push(topCenter, first, second);
  }

  cylinderPositions = new Float32Array(Positions);
  cylinderColors = new Float32Array(Colors);
  cylinderIndices = new Uint16Array(Indices);
}

function drawCone(radius, height)
{
  const Positions = [], Indices = [], Colors = [];
  const vsteps = 25;
  const usteps = 25;
  for(let i=0; i<= vsteps; i++)
  {
    let v = i / vsteps;
    for(let j=0; j<=usteps; j++)
    {
      let u = j * 2 * Math.PI / usteps;
      let sinu = Math.sin(u);
      let cosu = Math.cos(u);
      let x = radius * (1 - v) * cosu;
      let y = radius * (1 - v) * sinu;
      let z = v * height;
      Positions.push(x, y, z);
      Colors.push(Math.abs(Math.sin(j)), 0.25 + Math.abs(Math.sin(i)), Math.abs(Math.sin(i+j)));
    }
  }

  for(let i=0; i<vsteps; i++)
  {
    for(let j=0; j<usteps; j++)
    {
      let first = (i * (usteps + 1)) + j;
      let second = first + usteps + 1;
      Indices.push(first, second, first+1);
      Indices.push(second, second+1, first+1);
    }
  }

  let Center = Positions.length / 3;
  Positions.push(0, 0, 0);
  Colors.push(Math.random(), Math.random(), Math.random());

  for(let j=0; j<usteps; j++)
  {
    let first = j;
    let second = first+1;
    Indices.push(Center, second, first);
  }

  conePositions = new Float32Array(Positions);
  coneColors = new Float32Array(Colors);
  coneIndices = new Uint16Array(Indices);
}

function drawTorus(Radius, radius)
{
  const Positions = [], Indices = [], Colors = [];
  const vsteps = 25;
  const usteps = 25;
  for(let i=0; i<= vsteps; i++)
  {
    let v = i * 2 * Math.PI / vsteps;
    let sinv = Math.sin(v);
    let cosv = Math.cos(v);
    for(let j=0; j<=usteps; j++)
    {
      let u = j * 2 * Math.PI / usteps;
      let sinu = Math.sin(u);
      let cosu = Math.cos(u);
      let x = (Radius + radius * cosv) * cosu;
      let y = (Radius + radius * cosv) * sinu;
      let z = radius * sinv;
      Positions.push(x, y, z);
      Colors.push(0.25 + Math.abs(Math.sin(i)), Math.abs(Math.sin(j)), Math.abs(Math.sin(i+j)));
    }
  }

  for(let i=0; i<vsteps; i++)
  {
    for(let j=0; j<usteps; j++)
    {
      let first = (i * (usteps + 1)) + j;
      let second = first + usteps + 1;
      Indices.push(first, second, first+1);
      Indices.push(second, second+1, first+1);
    }
  }

  torusPositions = new Float32Array(Positions);
  torusColors = new Float32Array(Colors);
  torusIndices = new Uint16Array(Indices);
}

function translation(tx, ty, tz)
{
  return [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    tx, ty, tz, 1.0
  ]
}

function rotation(x, y)
{
  let cx = Math.cos(y), sx = Math.sin(y);
  let cy = Math.cos(x), sy = Math.sin(x);
  let rotX = [1, 0, 0, 0, 0, cy, sy, 0, 0, -sy, cy, 0, 0, 0, 0, 1];
  let rotY = [cx, 0, -sx, 0, 0, 1, 0, 0, sx, 0, cx, 0, 0, 0, 0, 1];
  return multiplyMat4(rotY, rotX);
}

function resetShapes()
{
  cyR = 0, toR = 0, spR = 0, coR = 0;
  cylinderSlider.value = 0;
  torusSlider.value = 0;
  sphereSlider.value = 0;
  coneSlider.value = 0;
}

let cyR = 0, toR = 0, spR = 0, coR = 0;

let cylinderSlider = document.getElementById("CylinderAngle");
let torusSlider = document.getElementById("TorusAngle");
let sphereSlider = document.getElementById("SphereAngle");
let coneSlider = document.getElementById("ConeAngle");

cylinderSlider.addEventListener("input", function ()
{
  cyR = this.value;
});

torusSlider.addEventListener("input", function ()
{
  toR = this.value;
});

sphereSlider.addEventListener("input", function ()
{
  spR = this.value;
});

coneSlider.addEventListener("input", function ()
{
  coR = this.value;
});

function rotationZ(z)
{
  let cz = Math.cos(z), sz = Math.sin(z);
  return [cz, sz, 0, 0, 
              -sz, cz, 0, 0, 
              0, 0, 1, 0, 
              0, 0, 0, 1];
}

function radiantodegree(radian)
{
  return radian * Math.PI / 180;
}

const baseLocal = {
  cylinder : translation(0, -2, 0),
  torus : translation(0, 2.3, 0),
  sphere : translation(0, 0.6, 0),
  cone : translation(0, 0.3, 0)
};

function updateShapes(scene)
{
  scene.cylinder.local = multiplyMat4(baseLocal.cylinder,rotationZ(radiantodegree(-cyR)));
  scene.torus.local = multiplyMat4(baseLocal.torus,rotationZ(radiantodegree(-toR)));
  scene.sphere.local = multiplyMat4(baseLocal.sphere,rotationZ(radiantodegree(-spR)));
  scene.cone.local = multiplyMat4(baseLocal.cone,rotationZ(radiantodegree(-coR)));
}