import { mkdirSync, existsSync } from 'fs';

export const ensureDirectoriesExist = () => {
  const directories = [
    './uploads',
    './uploads/publisher',
    './uploads/publisher/mediakits',
    './uploads/publisher/dropfiles',
  ];

  directories.forEach((dir) => {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};
