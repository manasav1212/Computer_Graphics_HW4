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

// cube
// let positions = new Float32Array([
//   -1, -1, -1,  // 0
//    1, -1, -1,  // 1
//    1,  1, -1,  // 2
//   -1,  1, -1,  // 3
//   -1, -1,  1,  // 4
//    1, -1,  1,  // 5
//    1,  1,  1,  // 6
//   -1,  1,  1   // 7
// ]);

// let colors = new Float32Array([
//   1,0,0,  0,1,0,  0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,0, 1,0,1
// ]);


// let indices = new Uint16Array([
//   // Front
//   4, 5, 6,   4, 6, 7,
//   // Back
//   1, 0, 3,   1, 3, 2,
//   // Top
//   3, 7, 6,   3, 6, 2,
//   // Bottom
//   0, 1, 5,   0, 5, 4,
//   // Right
//   1, 2, 6,   1, 6, 5,
//   // Left
//   0, 4, 7,   0, 7, 3,
// ]);

function drawCube()
{
   positions = new Float32Array([
    -1, -1, -1,  // 0
    1, -1, -1,  // 1
    1,  1, -1,  // 2
    -1,  1, -1,  // 3
    -1, -1,  1,  // 4
    1, -1,  1,  // 5
    1,  1,  1,  // 6
    -1,  1,  1   // 7
  ]);

   colors = new Float32Array([
    1,0,0,  0,1,0,  0,0,1, 1,1,0, 1,0,1, 0,1,1, 1,1,0, 1,0,1
  ]);


  indices = new Uint16Array([
    // Front
    4, 5, 6,   4, 6, 7,
    // Back
    1, 0, 3,   1, 3, 2,
    // Top
    3, 7, 6,   3, 6, 2,
    // Bottom
    0, 1, 5,   0, 5, 4,
    // Right
    1, 2, 6,   1, 6, 5,
    // Left
    0, 4, 7,   0, 7, 3,
  ]);
}

function drawSphere(radius)
{
  const Positions = [], Indices = [], Colors = [];
  let vsteps = 100;
  let usteps = 100;

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
      Colors.push(Math.abs(cosu), Math.abs(sinu), v);
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
  const vsteps = 100;
  const usteps = 100;
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
      Colors.push(Math.abs(cosu), Math.abs(sinu), v);
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
  Colors.push(1, 0, 0);

  let topCenter = Positions.length / 3;
  Positions.push(0, 0, height);
  Colors.push(0, 1, 0);

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
  const vsteps = 100;
  const usteps = 100;
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
      Colors.push(Math.abs(cosu), Math.abs(sinu), v);
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
  Colors.push(0.5, 0.5, 0.5);

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
  const vsteps = 100;
  const usteps = 100;
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
      Colors.push(Math.abs(cosu), Math.abs(sinu), v);
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

function scaling(sx, sy, sz)
{
  return [
    sx, 0.0, 0.0, 0.0,
    0.0, sy, 0.0, 0.0,
    0.0, 0.0, sz, 0.0,
    0.0, 0.0, 0.0, 1.0
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

function shearing(shxy, shxz, shyx, shyz, shzx, shzy)
{
  return [
    1, shyx, shzx, 0.0,
    shxy, 1, shzy, 0.0,
    shxz, shyz, 1, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]
}

let selectedTransformation = "rotate";
const transform = document.querySelectorAll('input[name="transformation"]');

transform.forEach(radio =>{
  radio.addEventListener('change', e=>{
    selectedTransformation = e.target.value;
  });
});

function getTransformationMatrix()
{
  let cubeRotation = rotation(cubeRotX, cubeRotY);
  let tranMat =  translation(translateX, translateY, 0);
  let scaleMat =  scaling(scaleX, scaleY, 1);
  let shearMat = shearing(shearXY, shearXZ, 0, shearYZ, 0, shearZY);

  return multiplyMat4(tranMat, multiplyMat4(cubeRotation, multiplyMat4(shearMat, scaleMat)));

}

function resetTransformation()
{
  cubeRotX = 45, cubeRotY = 45, translateX = 0, translateY = 0, scaleX = 1, scaleY = 1, shearXY = 0, shearXZ = 0, shearYZ = 0, shearZY = 0;
}