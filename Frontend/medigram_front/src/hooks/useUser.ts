import { useEffect, useState } from "react";
import userService, { CanceledError } from "../services/userService";

const useUserInfo = (userId: string) => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDoctor, setIsDoctor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    const { request: nameRequest, abort: abortName } = userService.getUserName(userId);
    nameRequest
      .then((response) => {
        setUsername(response.data);

        const { request: doctorRequest, abort: abortDoctor } = userService.isUserDoctor(userId);
        doctorRequest
          .then((response) => setIsDoctor(response.data))
          .catch((error) => {
            if (!(error instanceof CanceledError)) {
              setError(error.message);
            }
          })
          .finally(() => setLoading(false));

        return () => abortDoctor();
      })
      .catch((error) => {
        if (!(error instanceof CanceledError)) {
          setError(error.message);
        }
        setLoading(false);
      });

    return () => abortName();
  }, [userId]);

  return { username, isDoctor, loading, error };
};

export default useUserInfo;
