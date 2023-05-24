import React, { memo, useEffect, useState } from "react";
import User from "./User";
import ActivityIndicator from "../ActivityIndicator";
import { user } from "../../hooks/types";
import { getUser } from "../../hooks";
import { View } from "react-native";

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
  if (loading || user === undefined)
    return (
      <View style={{ width }}>
        <ActivityIndicator />
      </View>
    );
  return <User {...{ width, user }} />;
}

export default memo(UserContainer);
