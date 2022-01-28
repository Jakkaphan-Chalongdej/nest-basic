export const mapUrlMedia = (
  file: any,
  url: string = process.env.URL_MEDIA,
  folder = 'media',
) => {
  const pathFolder = `${folder}/${file.directoryName}`;
  if (file.type == '.xlsx' || file.type == '.xls' || file.type == '.pdf') {
    file.filePath = `${url}/public/${file.directoryName}/${file.filePath}`;
  } else if (file.type != 'url') {
    file.filePath = `${url}/public/${pathFolder}/${file.filePath}`;
  }
  return file;
};
