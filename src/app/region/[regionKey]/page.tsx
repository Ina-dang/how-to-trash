import { wasteGuide } from '@/data/yeongdeungpo';

export default function Page() {
  return (
    <main className='p-6'>
      <h1 className='text-xl font-bold mb-4'>{wasteGuide.region} 배출 기준</h1>

      {wasteGuide.categories.map((item) => (
        <div key={item.label} className='border p-4 mb-4 rounded'>
          <h2 className='font-semibold'>{item.label}</h2>
          <p>🕒 {item.time}</p>
          <p>📦 {item.method}</p>
          <p>📍 {item.place}</p>
        </div>
      ))}
    </main>
  );
}
