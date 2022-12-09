const audioUrl = (pathName = "") =>
  `${process.env.PUBLIC_URL}/audios/${pathName}`;

export default audioUrl;
