import { useHistory } from "react-router-dom";

import { User } from "@wasp/entities";
import { useQuery } from "@wasp/queries";

import ArenaP5 from "./components/ArenaP5";

import logout from "@wasp/auth/logout";
import getGame from "@wasp/queries/getGame";
import getTank from "@wasp/queries/getTank";
import getFOV from "@wasp/queries/getFOV";
import LoadingSpinner from "./components/LoadingSpinner";

export default function GamePage({ user }: { user: User }) {
  const { data: game, isFetching, error } = useQuery(getGame);

  const history = useHistory();

  return (
    <>
      <div className="flex w-screen h-screen pt-14 px-3">
        <Arena game={game} />
      </div>

      <div className="fixed top-0 w-full border-b bg-white shadow-sm">
        <div className="flex flex-row px-4 py-2 justify-between font-medium text-2xl items-center">
          <div className="flex flex-row gap-1">
            <div>
              {user.username}{" "}
              <span className="opacity-60 font-normal text-xl">
                (#{user.id})
              </span>
            </div>
          </div>

          <div className="flex flex-row gap-1">
            <button
              className="flex self-center opacity-60 hover:opacity-100"
              onClick={() => {
                history.push("/");
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <button
              className="flex self-center opacity-60 hover:opacity-100"
              onClick={logout}
            >
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Arena(props: { game: any | null }) {
  const { game } = props;
  const { data: tank, isFetching, error } = useQuery(getTank);
  const { data: fov } = useQuery(getFOV);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="bg-red-100">{JSON.stringify(game)}</div>
        <div className="bg-green-100">{JSON.stringify(tank)}</div>
        <div className="bg-blue-100">{JSON.stringify(fov)}</div>
      </div>
      <div className="w-full h-full">
        {isFetching ? (
          <LoadingSpinner />
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <ArenaP5 game={game} tank={tank} fov={fov} />
        )}
      </div>
    </div>
  );
}
