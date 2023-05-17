import React, { memo, useEffect, useState } from "react";
import User from "./User";
import { ActivityIndicator } from "../../../components";
import { user } from "../../../hooks/types";
import { getUser } from "../../../hooks";

interface IUserContainer {
  id: string;
  width: number;
}

function UserContainer({ id, width }: IUserContainer): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<user>();
  useEffect(() => {
    async function fetchUser() {
      const _user = await getUser(id);
      setUser(_user);
      setLoading(false);
    }
    fetchUser();
  }, []);
  if (loading || user === undefined) return <ActivityIndicator />;

  return <User {...{ width, user }} />;
}

export default memo(UserContainer);
