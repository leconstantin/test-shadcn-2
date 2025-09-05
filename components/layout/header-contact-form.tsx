'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import confetti from 'canvas-confetti';
import { Angry, Annoyed, Laugh, Smile } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  email: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  type: z.enum(['best', 'better', 'good', 'bad'], {
    message: 'You need to select a feeling type.',
  }),
  feedback: z.string().min(10, {
    message: 'Feedback must be at least 10 characters.',
  }),
});
export default function HeaderContactForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      type: undefined,
      feedback: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('You submitted the following values:', {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
    form.reset();
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="cursor-pointer px-4" size="sm" variant="ghost">
          Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'mx-4 mt-1.5 w-[21.5rem] rounded-lg border-0 bg-background ring ring-ring/25 md:m-4',
          'rounded-t-none md:rounded-lg'
        )}
      >
        <Form {...form}>
          <form
            className="flex w-full flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Feedback</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] resize-none"
                        placeholder="Tell us a your feedback..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="sr-only">
                      Notify me about...
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex space-x-1"
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormItem className="flex items-center">
                          <FormControl className="sr-only">
                            <RadioGroupItem value="best" />
                          </FormControl>
                          <FormLabel
                            className={`cursor-pointer font-normal text-muted-foreground ${
                              field.value === 'best' ? 'text-emerald-500' : ''
                            }`}
                          >
                            <Laugh className="size-6" />
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl className="sr-only">
                            <RadioGroupItem value="better" />
                          </FormControl>
                          <FormLabel
                            className={`cursor-pointer font-normal text-muted-foreground ${
                              field.value === 'better' ? 'text-sky-500' : ''
                            }`}
                          >
                            <Smile className="size-6" />
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl className="sr-only">
                            <RadioGroupItem value="good" />
                          </FormControl>
                          <FormLabel
                            className={`cursor-pointer font-normal text-muted-foreground ${
                              field.value === 'good' ? 'text-amber-400' : ''
                            }`}
                          >
                            <Annoyed className="size-6" />
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl className="sr-only">
                            <RadioGroupItem value="bad" />
                          </FormControl>
                          <FormLabel
                            className={`cursor-pointer font-normal text-muted-foreground ${
                              field.value === 'bad' ? 'text-rose-500' : ''
                            }`}
                          >
                            <Angry className="size-6" />
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button size="sm" type="submit">
                Send
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
