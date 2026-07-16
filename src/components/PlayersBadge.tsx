type Props = {
  count: number;
};

function PlayersBadge({ count }: Props) {
  return (
    <div className="top-badge">
      👥 {count}
    </div>
  );
}

export default PlayersBadge;