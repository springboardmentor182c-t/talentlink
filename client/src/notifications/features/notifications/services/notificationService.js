// temporary mock notifications so UI renders exactly like the design
export async function getNotificationsMock() {
  // simulate network delay
  await new Promise((r) => setTimeout(r, 150));

  return [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/48?img=12",
      title: "Aarav",
      message: "Meera shared the \"client documents\" with you.",
      time: "4:30pm",
      relative: "2min ago",
      read: false,
      category: "all",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/48?img=5",
      title: "Nathesha",
      message: "Country — new update available.",
      time: "4:27pm",
      relative: "3min ago",
      read: false,
      category: "all",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/48?img=14",
      title: "Bobby",
      message: "You have a missed call from (408) 555-0102.",
      time: "4:22pm",
      relative: "5min ago",
      read: true,
      category: "favourites",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/48?img=30",
      title: "Prabhu",
      message: "Invoice #127 saved to your account.",
      time: "4:00pm",
      relative: "30min ago",
      read: true,
      category: "favourites",
    },
    {
      id: 5,
      avatar: "https://i.pravatar.cc/48?img=7",
      title: "Donald's",
      message: "Your coupon is ready to use.",
      time: "3:30pm",
      relative: "1h ago",
      read: true,
      category: "all",
    },
    {
      id: 6,
      avatar: "https://i.pravatar.cc/48?img=9",
      title: "Lalitha",
      message: "New comment on your post.",
      time: "3:23pm",
      relative: "2h ago",
      read: true,
      category: "mytasks",
    },
  ];
}
