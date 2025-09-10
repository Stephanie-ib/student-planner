interface StatsCardProps {
  title: string;
  value: number;
  textColor?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, textColor = 'text-white' }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
      <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
};

export default StatsCard