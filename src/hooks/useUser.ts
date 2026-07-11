const tg = (window as any).Telegram?.WebApp;

export function useUser() {

  const userId =
    tg?.initDataUnsafe?.user?.id?.toString() ??
    localStorage.getItem("userId") ??
    (() => {
      const id = crypto.randomUUID();
      localStorage.setItem("userId", id);
      return id;
    })();


  const isAdmin = userId === "846617693";


  return {
    userId,
    isAdmin,
  };
}