import SummaryCard from './SummaryCard';
import { summaryCardsData } from '../data/summaryCardsData';

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryCardsData.map((card) => (
        <SummaryCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards; 