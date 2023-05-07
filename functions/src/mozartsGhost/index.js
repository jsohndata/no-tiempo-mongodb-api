const links = [
  /* 00 */ "https://www.youtube.com/watch?v=hoWEYBSlctc", // mozart's ghost
  /* 01 */ "https://www.youtube.com/watch?v=9E6b3swbnWg", // random
  
  /* 02 */ "https://assenfuego.com/", 
  /* 03 */ "https://jsohndata.github.io/bluenight-in-seoul/",
  /* 04 */ "https://jsohndata.github.io/kardashev-scale/",
  /* 05 */ "https://jsohndata.github.io/bubble-trails/",
  /* 06 */ "https://system-overload-solution.web.app/",
  /* 07 */ "https://jsohndata.github.io/magic-color-xxl/",
  /* 08 */ "https://jsohndata.github.io/cogito-ergo-sum/",
  /* 09 */ "https://jsohndata.com",
  /* 10 */ "https://jsohndata.github.io/synthational/"
];

export function getRedirect(req, res) {
  const id = parseInt(req.params.id);

  if (!id || id < 0 || id > links.length) { 
    const redirectLink = links[0]; 
  }

  const redirectLink = links[id];

  res.status(200).redirect(redirectLink);
}