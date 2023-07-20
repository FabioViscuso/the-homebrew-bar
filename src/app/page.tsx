import { Poiret_One, Sacramento } from 'next/font/google';
import Image from 'next/image';
import { icons } from '@/lib/iconsImport';

const poiret = Poiret_One({subsets: ['latin'] , weight: '400'});
const sacramento = Sacramento({subsets: ['latin'], weight: '400'});

export default function Landing() {
  return (
    <main className={` flex min-h-screen flex-col items-center justify-between p-24 `}>
      <div className={' flex '}>
        <h1 className={` relative ${sacramento.className} text-9xl neon neon-flicker neon-blue leading-tight `}>
          The<br></br> Homebrew<br></br> Bar
          <Image src={icons.cocktailIcon} width={128} height={128} alt='' className='hero-cocktail neon-icon-flicker' />
        </h1>
      </div>
    </main>
  )
}
