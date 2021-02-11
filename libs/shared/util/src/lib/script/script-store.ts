interface Scripts {
  name: string;
  src: string;
}

let API_KEY;
export const ScriptStore: Scripts[] = [
  {name: 'googleMapsAPI', src: `/google/maps/api/js?key=${API_KEY}`}
];
