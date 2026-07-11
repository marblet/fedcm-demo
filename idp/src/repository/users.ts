export type User = {
  id: string;
  password: string;
  name: string;
};

const users = new Map<string, User>([
  [
    "demo1",
    {
      id: "demo1",
      password: "Pass1",
      name: "Demo User 1",
    },
  ],
  [
    "demo2",
    {
      id: "demo2",
      password: "Pass2",
      name: "Demo User 2",
    },
  ],
]);

export const getUser = (id: string): User | undefined => {
  return users.get(id);
};

export const saveUser = (user: User): void => {
  users.set(user.id, user);
};

export const createUser = (user: User): boolean => {
  if (users.has(user.id)) {
    return false;
  }

  saveUser(user);
  return true;
};

export const verifyUser = (id: string, password: string): User | undefined => {
  const user = getUser(id);

  if (!user || user.password !== password) {
    return undefined;
  }

  return user;
};
