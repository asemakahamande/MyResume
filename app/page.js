import { readFile } from 'fs/promises';
import { join } from 'path';
import Link from 'next/link';
import PortfolioClient from './PortfolioClient';

async function getData() {
  async function readJSON(filename) {
    try {
      const content = await readFile(join(process.cwd(), 'data', filename), 'utf-8');
      return JSON.parse(content);
    } catch {
      return filename === 'cv.json' ? { filename: null } : [];
    }
  }

  const [experience, projects, cv] = await Promise.all([
    readJSON('experience.json'),
    readJSON('projects.json'),
    readJSON('cv.json'),
  ]);

  return { experience, projects, cv };
}

export default async function HomePage() {
  const { experience, projects, cv } = await getData();

  return <PortfolioClient experience={experience} projects={projects} cv={cv} />;
}
