import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';

export const size = {
  width: 1200,
  height: 630,
};

const fontPath = process.cwd() + '/public/Kanit-SemiBold.ttf';

export default async function Image() {
  const kanitFont = await readFile(fontPath);

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Kanit',
          fontSize: 144,
          background: '#222831',
          color: '#FEFBF6',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Verbitus
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Kanit',
          data: kanitFont,
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
