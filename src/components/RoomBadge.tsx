type Props = {
  room: string | null;
};

function RoomBadge({ room }: Props) {
  if (!room) return null;

  return (
  <div className="top-badge room-badge">
  🏠 {room}
</div>
  );
}

export default RoomBadge;