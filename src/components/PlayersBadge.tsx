type Props = {
  count: number;
};

function PlayersBadge({ count }: Props) {
  return (
    <div className="top-badge players-badge">
      👥 {count}
    </div>
  );
}

export default PlayersBadge;