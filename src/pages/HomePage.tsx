import React, { useMemo, useState } from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import Modal from "../components/dialog/Modal";
import EventEditForm, { EventFormData } from "../components/form/EventEditForm";
import {
  EventParams,
  Importance,
  importanceValues,
  useEventsQuery,
} from "../api/event";
import { EventInput } from "@fullcalendar/core/index.js";
import Select from "../components/select/Select";

const HomePage: React.FC = () => {
  const [queryParams, setQueryParams] = useState<EventParams>({
    search: "",
    importance: Importance.ANY,
  });
  const { createEvent, getEvents, deleteEvent, updateEvent } =
    useEventsQuery(queryParams);
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<EventFormData | null>(null);

  const handleSubmit = (data: EventFormData) => {
    const date = isNaN(new Date(data.date).getTime())
      ? new Date()
      : new Date(data.date);
    if (data.id) {
      const formdata = { ...data, date, id: data.id };
      updateEvent.mutate(formdata, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else {
      const formdata = { ...data, date };
      createEvent.mutate(formdata, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  const handleDelete = (id: string | null) => {
    if (id) {
      deleteEvent.mutate(id, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  const handleCreate = (date?: string) => {
    setEditEventId("create");
    if (date) {
      setNewEvent({
        date,
        description: "",
        importance: Importance.СOMMON,
        name: "",
      });
    }
  };

  const handleClose = () => {
    setEditEventId(null);
    setNewEvent(null);
  };

  const events: {
    calendar: EventInput[] | undefined;
    form: EventFormData[] | undefined;
  } = useMemo(() => {
    const data = getEvents.data;
    return {
      calendar: data?.map((event) => ({
        id: event.id,
        title: event.name,
        date: event.date,
      })),
      form: data?.map((event) => ({
        id: event.id,
        date: new Date(event.date).toISOString(),
        importance: event.importance as Importance,
        name: event.name,
        description: event.description,
      })),
    };
  }, [getEvents]);

  return (
    <div className="w-full h-full p-12">
      <div className="pb-6 flex flex-row gap-12 items-center justify-between">
        <div className="w-[200px]">
          <Select
            label="Importance"
            selected={
              importanceValues[queryParams.importance as Importance] ||
              Importance.ANY
            }
            setSelected={(value) =>
              setQueryParams((prev) => ({
                ...prev,
                importance: value as Importance,
              }))
            }
            items={Object.entries(importanceValues).map(
              ([name, label], index) => ({
                id: index,
                name,
                label,
              })
            )}
          />
        </div>
        <button
          type="button"
          data-autofocus
          onClick={() => handleCreate()}
          className="cursor-pointer inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:w-auto "
        >
          Create Event
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events.calendar}
        eventClick={(e) => setEditEventId(e.event.id)}
        height="auto"
        dateClick={(e) => handleCreate(e.date.toISOString())}
      />
      <Modal
        open={!!editEventId}
        onClose={handleClose}
        title="Create Event"
        buttonText="Delete event"
        onClickButton={() => handleDelete(editEventId)}
      >
        <EventEditForm
          onSubmit={handleSubmit}
          submitText="Submit"
          onCancel={handleClose}
          initValues={
            events.form?.find((event) => event.id === editEventId) ||
            newEvent ||
            undefined
          }
        />
      </Modal>
    </div>
  );
};

export default HomePage;
