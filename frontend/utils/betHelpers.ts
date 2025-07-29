
export const calculateGroupStats = (bets: any[]) => {
  const totalAmount = bets.reduce((sum, bet) => sum + (bet.amount || 0), 0);
  const totalWin = bets.reduce((sum, bet) => sum + (bet.winAmount || 0), 0);
  const winCount = bets.filter(bet => bet.status === 'win').length;
  const lossCount = bets.filter(bet => bet.status === 'loss').length;
  const pendingCount = bets.filter(bet => bet.status === 'pending').length;
  
  return {
    totalAmount,
    totalWin,
    winCount,
    lossCount,
    pendingCount,
    winPercentage: bets.length > 0 ? (winCount / bets.length) * 100 : 0
  };
};

export const getBetTypeDisplay = (type: string) => {
  const typeMap: { [key: string]: string } = {
    'single': 'Single',
    'jodi': 'Jodi',
    'andar': 'Andar',
    'bahar': 'Bahar',
    'panna': 'Panna'
  };
  return typeMap[type?.toLowerCase()] || type;
};

export const formatTimestamp = (timestamp: number | string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const getBetStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'win':
      return '#00FF88';
    case 'loss':
      return '#FF6B6B';
    case 'pending':
      return '#FFD700';
    default:
      return '#999';
  }
};
