import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/useApi";

export const importanceValues = {
  ANY: "Any",
  COMMON: "Common",
  IMPORTANT: "Important",
  CRITICAL: "Critical",
};

export enum Importance {
  ANY = "ANY",
  СOMMON = "COMMON",
  IMPORTANT = "IMPORTANT",
  CRITICAL = "CRITICAL",
}

export type Event = {
  id: string;
  name: string;
  description: string;
  date: Date;
  importance: string;
};

export type EventParams = {
  importance?: Importance;
  search?: string;
};

export const useEventsQuery = (params: EventParams) => {
  const { fetchData } = useApi();
  const queryClient = useQueryClient();

  const query =
    params.importance === Importance.ANY
      ? params.search
        ? { search: params.search }
        : null
      : params;

  const getEvents = useQuery<Event[]>({
    queryKey: ["events", params],
    queryFn: async () =>
      fetchData("events", {
        ...(query ? { queryParams: query } : {}),
      }),
    refetchOnWindowFocus: false,
  });
  const createEvent = useMutation({
    mutationFn: async (body: Omit<Event, "id">) => {
      return fetchData(`/events`, { body, method: "POST" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", params] });
    },
  });

  const updateEvent = useMutation({
    mutationFn: async (body: Event) => {
      const { id, ...rest } = body;
      return fetchData(`/events/${body.id}`, { body: rest, method: "PUT" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", params] });
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      return fetchData(`/events/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", params] });
    },
  });

  return {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
