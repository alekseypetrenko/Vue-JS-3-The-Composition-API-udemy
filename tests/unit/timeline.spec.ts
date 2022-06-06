import {nextTick} from "vue";
import {mount, flushPromises} from "@vue/test-utils";
import TimeLine from "@/components/TimeLine.vue";
import {today, thisWeek, thisMonth} from '@/mocks';

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth]
    })
  }
}))

function mounTimeLine(){
  return mount({
    components: { TimeLine },
    template: `
      <suspense>
        <template #default>
          <time-line />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `
  });
}

describe('TimeLine', () => {
  it('renders today post default', async () => {
    const wrapper = mounTimeLine();
    await flushPromises();
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  })

  // When click requestAnimationFram(() => ...) is called
  it('update when the period Week is clicked', async () => {
    const wrapper = mounTimeLine();
    
    // wait for the next frame
    await flushPromises();
    await wrapper.get('[data-test="This Week"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  })

  // When click requestAnimationFram(() => ...) is called
  it('update when the period Month is clicked', async () => {
    const wrapper = mounTimeLine();
    // wait for the next frame
    // await nextTick() or just add await before wrpper trigger
    await flushPromises();
    await wrapper.get('[data-test="This Month"]').trigger('click')
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  })
})