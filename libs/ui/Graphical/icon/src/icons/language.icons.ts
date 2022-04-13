import { svg } from 'lit';
import { Icon, IconTypes } from '../icon.model';

export const planet: Icon = {
  type: IconTypes.Planet,
  source: svg`
<path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM18.9 8H16C15.7 6.7 15.2 5.6 14.6 4.4C16.4 5.1 18 6.3 18.9 8ZM12 4C12.8 5.2 13.5 6.5 13.9 8H10.1C10.5 6.6 11.2 5.2 12 4ZM4.3 14C4.1 13.4 4 12.7 4 12C4 11.3 4.1 10.6 4.3 10H7.7C7.6 10.7 7.6 11.3 7.6 12C7.6 12.7 7.7 13.3 7.7 14H4.3ZM5.1 16H8C8.3 17.3 8.8 18.4 9.4 19.6C7.6 18.9 6 17.7 5.1 16ZM8 8H5.1C6.1 6.3 7.6 5.1 9.4 4.4C8.8 5.6 8.3 6.7 8 8ZM12 20C11.2 18.8 10.5 17.5 10.1 16H13.9C13.5 17.4 12.8 18.8 12 20ZM14.3 14H9.7C9.6 13.3 9.5 12.7 9.5 12C9.5 11.3 9.6 10.7 9.7 10H14.4C14.5 10.7 14.6 11.3 14.6 12C14.6 12.7 14.4 13.3 14.3 14ZM14.6 19.6C15.2 18.5 15.7 17.3 16 16H18.9C18 17.7 16.4 18.9 14.6 19.6ZM16.4 14C16.5 13.3 16.5 12.7 16.5 12C16.5 11.3 16.4 10.7 16.4 10H19.8C20 10.6 20.1 11.3 20.1 12C20.1 12.7 20 13.4 19.8 14H16.4Z"/>
  `,
};

export const germany: Icon = {
  type: IconTypes.Germany,
  source: svg`
<path d="M2.62207 15.4782C4.035 19.2861 7.70043 21.9999 12.0001 21.9999C16.2997 21.9999 19.9652 19.2861 21.3781 15.4782L12.0001 14.6086L2.62207 15.4782Z" fill="#FFDA44"/>
<path d="M12.0001 2C7.70043 2 4.035 4.71375 2.62207 8.52176L12.0001 9.39129L21.3781 8.52172C19.9652 4.71375 16.2997 2 12.0001 2Z" fill="black"/>
<path d="M2.62199 8.52173C2.22004 9.60505 2 10.7768 2 12C2 13.2232 2.22004 14.3949 2.62199 15.4782H21.378C21.78 14.3949 22 13.2232 22 12C22 10.7768 21.78 9.60505 21.378 8.52173H2.62199Z" fill="#D80027"/>
`,
};

export const america: Icon = {
  type: IconTypes.America,
  source: svg`
      <circle cx="12.0817" cy="12.0817" r="10.0817" fill="#F0F0F0"/>
<path d="M11.6436 12.0817H22.1636C22.1636 11.1717 22.0423 10.2902 21.8162 9.45166H11.6436V12.0817Z" fill="#D80027"/>
<path d="M11.6436 6.82167H20.6838C20.0667 5.8146 19.2776 4.92446 18.3576 4.19165H11.6436V6.82167Z" fill="#D80027"/>
<path d="M12.0823 22.1633C14.455 22.1633 16.6359 21.3433 18.358 19.9717H5.80664C7.5288 21.3433 9.70963 22.1633 12.0823 22.1633Z" fill="#D80027"/>
<path d="M3.48007 17.3417H20.684C21.1795 16.5332 21.5637 15.6495 21.8164 14.7117H2.34766C2.60037 15.6495 2.98461 16.5332 3.48007 17.3417Z" fill="#D80027"/>
<path d="M7.58876 3.5744H6.67003C8.23351 2.57773 10.0901 2 12.0817 2V12.0817H2C2 11.6559 2.0267 11.2364 2.07794 10.8246L2.58982 10.4527L3.44436 11.0735L3.11792 10.0689L3.97251 9.44808H2.91621L2.63003 8.56719C2.72907 8.30078 2.83926 8.0398 2.95973 7.78456L3.44436 8.13667L3.1846 7.33719C3.26249 7.19144 3.34378 7.04781 3.42853 6.90643L3.97251 6.51124H3.67813C4.22159 5.69305 4.88108 4.95874 5.6335 4.33198L5.35153 5.19983L6.20607 4.57898L7.06061 5.19983L6.73418 4.19525L7.58876 3.5744ZM6.20607 10.4527L7.06061 11.0735L6.73418 10.0689L7.58876 9.44808H6.53247L6.20607 8.4435L5.87968 9.44808H4.82338L5.67796 10.0689L5.35153 11.0735L6.20607 10.4527ZM6.73418 7.13209L7.06061 8.13667L6.20607 7.51582L5.35153 8.13667L5.67796 7.13209L4.82338 6.51124H5.87968L6.20607 5.50665L6.53247 6.51124H7.58876L6.73418 7.13209ZM9.82232 10.4527L10.6769 11.0735L10.3504 10.0689L11.205 9.44808H10.1487L9.82232 8.4435L9.49593 9.44808H8.43964L9.29422 10.0689L8.96778 11.0735L9.82232 10.4527ZM10.3504 7.13209L10.6769 8.13667L9.82232 7.51582L8.96778 8.13667L9.29422 7.13209L8.43964 6.51124H9.49593L9.82232 5.50665L10.1487 6.51124H11.205L10.3504 7.13209ZM10.6769 5.19983L10.3504 4.19525L11.205 3.5744H10.1487L9.82232 2.56981L9.49593 3.5744H8.43964L9.29422 4.19525L8.96778 5.19983L9.82232 4.57898L10.6769 5.19983Z" fill="#0052B4"/>
`,
};

export const spain: Icon = {
  type: IconTypes.Spain,
  source: svg`
<path d="M2.62207 15.4782C4.035 19.2861 7.70043 21.9999 12.0001 21.9999C16.2997 21.9999 19.9652 19.2861 21.3781 15.4782L12.0001 14.6086L2.62207 15.4782Z" fill="#C60B1E"/>
<path d="M12.0001 2C7.70043 2 4.035 4.71375 2.62207 8.52176L12.0001 9.39129L21.3781 8.52172C19.9652 4.71375 16.2997 2 12.0001 2Z" fill="#C60B1E"/>
<path d="M2.62199 8.52173C2.22004 9.60505 2 10.7768 2 12C2 13.2232 2.22004 14.3949 2.62199 15.4782H21.378C21.78 14.3949 22 13.2232 22 12C22 10.7768 21.78 9.60505 21.378 8.52173H2.62199Z" fill="#FFC400"/>
  `,
};

export const france: Icon = {
  type: IconTypes.France,
  source: svg`
<path d="M8.52207 2.62207C4.7141 4.035 2.00031 7.70043 2.00031 12.0001C2.00031 16.2997 4.7141 19.9652 8.52207 21.3781L9.3916 12.0001L8.52207 2.62207Z" fill="#042891"/>
<path d="M22 12.0001C22 7.70043 19.2863 4.035 15.4782 2.62207L14.6087 12.0001L15.4783 21.3781C19.2862 19.9652 22 16.2997 22 12.0001Z" fill="#DB3F41"/>
<path d="M15.4785 2.62199C14.3952 2.22004 13.2235 2 12.0003 2C10.7771 2 9.60535 2.22004 8.52203 2.62199L8.52203 21.378C9.60535 21.78 10.7771 22 12.0003 22C13.2235 22 14.3952 21.78 15.4785 21.378L15.4785 2.62199Z" fill="white"/>
  `,
};
