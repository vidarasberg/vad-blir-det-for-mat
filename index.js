import { createServer } from "http";

const recept = [
  {
    name: "Dill och potatisgryta med kikärtor",
    link: "https://undertian.com/recept/dill-och-potatisgryta-med-kikartor/",
  },
  {
    name: "Penne med spenat och valnötter",
    link: "",
  },
  {
    name: "Bönchilli",
    link: "",
  },
  {
    name: "Pasta verde",
    link: "https://www.ica.se/recept/pasta-verde-725961/",
  },
  {
    name: "Linssoppa med tomat",
    link: "https://www.ica.se/recept/linssoppa-med-tomat-541439/",
  },
  {
    name: "Bucatini med auberginesås och tomatsallad",
    link: "https://www.ica.se/recept/bucatini-med-auberginesas-och-tomatsallad-715473/",
  },
  {
    name: "Pasta med broccoli och soltorkade tomater",
    link: "https://www.valjvego.se/recept/pasta-med-broccoli-och-soltorkade-tomater",
  },
];

const html = (h1, body) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enkel veganmat</title>
  </head>
  <h1>${h1 ?? ""}</h1>
  <body>${body ?? ""}</body>
</html>`;
};

const server = createServer((req, res) => {
  if (req.url === "/") {
    const recipies = recept.map(
      (x) => `<li><a href="${x.link}">${x.name}</a></li>`
    );
    const list = `<ul>${recipies.join("")}</ul>`;
    const htmlContent = html("Alla recept", list);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(htmlContent);
  } else if (req.url === "/random") {
    const randomIndex = Math.floor(Math.random() * recept.length);
    const { name, link } = recept[randomIndex];
    const htmlContent = html(
      "Random veganmat",
      `<a href="${link}">${name}</a>`
    );
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(htmlContent);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
  }
  res.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
