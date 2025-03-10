"use client";

import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { parse } from "tldts";
import { useDebouncedCallback } from "use-debounce";
import { useForm } from "react-hook-form";
import useUserQuery from "@/hooks/use-user-query";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
    .object({
        query: z.string(),
    })
    .refine(
        (data) => {
            if (data.query.endsWith(".") || data.query.startsWith(".")) {
                return false;
            } else {
                return true;
            }
        },
        {
            message: "Query can't start or end with a dot",
            path: ["query"],
        }
    );

function UserQueryForm() {
    const { query, setQuery } = useUserQuery();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            query: query,
        },
    });

    const onSubmit = useCallback(
        (values: z.infer<typeof formSchema>) => {
            setQuery(values.query);
        },
        [setQuery]
    );

    const { handleSubmit, watch, setValue } = form;
    const submit = handleSubmit(onSubmit);

    const handleWatch = useDebouncedCallback((values) => {
        if (values.query && values.query.length > 2) {
            const result = parse(values.query.replace(" ", ""));
            if (result.domain && values.query != result.domain) {
                setValue("query", result.domain);
                return;
            }
        }
        submit();
    }, 500);

    useEffect(() => {
        const subscription = watch(handleWatch);
        return () => subscription.unsubscribe();
    }, [handleWatch, watch]);

    return (
        <div className="sticky top-0 bg-background z-10 py-5">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="flex items-end">
                        <div className="flex-grow pe-4">
                            <FormField
                                control={form.control}
                                name="query"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Begin your search...
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                                form.setValue("query", "");
                            }}
                        >
                            <XIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default UserQueryForm;
